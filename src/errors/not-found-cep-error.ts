import { ApplicationError } from '@/protocols';

export function notFoundCepError(): ApplicationError {
  return {
    name: 'NotFoundCepError',
    message: 'CEP must have 8 characters.!',
  };
}
