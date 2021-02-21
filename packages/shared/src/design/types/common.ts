// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TObject = Record<PropertyKey, unknown>;

export interface Constructable {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: unknown[]): any;
}

export type Extend<Source, O, K extends PropertyKey> = Source & O & { [key in K]: TObject }
