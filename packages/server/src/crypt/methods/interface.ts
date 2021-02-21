import { EncType } from '@packages/shared/design/types/encryption';

interface Instance {
  enc(val: string): string
  dec(val: string): string
}

export interface ICrypt {
  new (): Instance
  type: EncType
}

export function CheckImplements<T>(): <K extends T>(ctor: K) => K {
  return <K extends T>(ctor: K) => ctor;
}
