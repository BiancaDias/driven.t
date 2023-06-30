import { ApplicationError } from '@/protocols';

export function invalidCepError(): ApplicationError {
  return {
    name: 'InvalidCepError',
    message: 'CEP must have 8 characters.!',
  };
}
