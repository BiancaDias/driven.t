import { Address, Enrollment } from '@prisma/client';
import { request } from '@/utils/request';
import { notFoundError } from '@/errors';
import addressRepository, { CreateAddressParams } from '@/repositories/address-repository';
import enrollmentRepository, { CreateEnrollmentParams } from '@/repositories/enrollment-repository';
import { exclude } from '@/utils/prisma-utils';
import { ViaCEPAddress } from '@/protocols';
// TODO - Receber o CEP por parâmetro nesta função.

type ViaCEPAddressSend = Omit<ViaCEPAddress, 'localidade'> & { cidade: string };
async function getAddressFromCEP(cep: string): Promise<ViaCEPAddressSend> {
  // FIXME: está com CEP fixo!
  const result = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
  if (result.status !== 200 || result.data.erro) {
    throw notFoundError();
  }

  // FIXME: não estamos interessados em todos os campos
  return {
    logradouro: result.data.logradouro,
    complemento: result.data.complemento,
    bairro: result.data.bairro,
    cidade: result.data.localidade,
    uf: result.data.uf,
  };
}

async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, 'userId', 'createdAt', 'updatedAt', 'Address'),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, 'userId' | 'createdAt' | 'updatedAt'>;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, 'createdAt', 'updatedAt', 'enrollmentId');
}

type GetAddressResult = Omit<Address, 'createdAt' | 'updatedAt' | 'enrollmentId'>;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment = exclude(params, 'address');
  const address = getAddressForUpsert(params.address);

  // TODO - Verificar se o CEP é válido antes de associar ao enrollment.
  const result = await request.get(`${process.env.VIA_CEP_API}/${address.cep}/json/`);
  if (result.status !== 200 || result.data.erro) {
    throw notFoundError();
  }

  const newEnrollment = await enrollmentRepository.upsert(params.userId, enrollment, exclude(enrollment, 'userId'));

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP,
};

export default enrollmentsService;