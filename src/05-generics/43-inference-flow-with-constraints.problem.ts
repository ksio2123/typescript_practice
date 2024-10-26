import { createUser } from "fake-external-lib";
import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

type Mutation<T extends any[],U> = (...args: T) => Promise<U>;

interface UseMutationReturn<T extends any[],U> {
  mutate: Mutation<T,U>;
  isLoading: boolean;
}

interface UseMutationOptions<T extends any[],U> {
  mutation: Mutation<T,U>;
}

export const useMutation = <T extends any[],U>(opts: UseMutationOptions<T,U>): UseMutationReturn<T,U> => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: async (...args) => {
      setIsLoading(true);

      try {
        const result = await opts.mutation(...args);
        return result;
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    isLoading,
  };
};

const mutation = useMutation({
  mutation: createUser,
});

mutation.mutate({ name: "John Doe", email: "john@doe.com" });

// @ts-expect-error email missing!
mutation.mutate({ name: "John Doe" });

mutation.mutate(
  {
    name: "John Doe",
    email: "john@doe.com",
  },
  {
    throwOnError: true,
    // @ts-expect-error extra prop
    extra: "oh dear",
  },
);

type test = [
  Expect<Equal<typeof mutation.isLoading, boolean>>,
  Expect<
    Equal<
      typeof mutation.mutate,
      (
        user: { name: string; email: string },
        opts?: {
          throwOnError?: boolean;
        },
      ) => Promise<{
        id: string;
        name: string;
        email: string;
      }>
    >
  >,
];
