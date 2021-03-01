export type TObject = Record<PropertyKey, unknown>;

export type ValueOf<T> = T[keyof T]

export interface Constructable {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: unknown[]): any;
}

export type Extend<Source, O, K extends PropertyKey> = Source & O & { [key in K]: TObject }
