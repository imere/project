import { EncType } from '@package/shared/src/design/types/encryption';
import { ValueOf } from '@package/shared/src/design/types/common';

interface Instance {
  enc(val: string): string
  dec(val: string): string
}

export interface ICrypt {
  new (): Instance
  type: ValueOf<typeof EncType>
}

export function CheckImplements<T>(): <K extends T>(ctor: K) => K {
  return <K extends T>(ctor: K) => ctor;
}
