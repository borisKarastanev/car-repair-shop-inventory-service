export type Payload<T, ID = { id: string }> = ID & {
  entity: T;
};
