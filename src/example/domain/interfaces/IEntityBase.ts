export interface IEntityBase {
  id: string;

  toPrimitive(): Record<string, any>;
}
