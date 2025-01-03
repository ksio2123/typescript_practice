import { Equal, Expect } from "../helpers/type-utils";

type AllOrNothing<T extends Record<string, any>> = T | ToUndefinedObject<T>;

type ToUndefinedObject<T extends Record<string, any>> = Partial<
  Record<keyof T, undefined>
>;

type tests = [
  // @ts-expect-error
  AllOrNothing<string>,
  // @ts-expect-error
  AllOrNothing<number>,
  // @ts-expect-error
  AllOrNothing<undefined>,
  AllOrNothing<string[]>,
  Expect<Equal<AllOrNothing<{ a: string }>, { a: string } | { a?: undefined }>>
];

// Note that this isn't perfect! Try AllOrNothing<string[]>
