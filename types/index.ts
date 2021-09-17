export type Modify<T, R> = Omit<T, keyof R> & R;

export type Obj = Record<string, any>;

/** Makes each property optional and turns each leaf property into any, allowing for type overrides by narrowing any. */
export type DeepPartialAny<T> = {
  [P in keyof T]?: T[P] extends Obj ? DeepPartialAny<T[P]> : any
}

export type ModifyDeep<A extends Obj, B extends DeepPartialAny<A>> = {
  [K in keyof A]: B[K] extends never
    ? A[K]
    : B[K] extends Obj
      ? ModifyDeep<A[K], B[K]>
      : B[K]
} & (A extends Obj ? Omit<B, keyof A> : A);
