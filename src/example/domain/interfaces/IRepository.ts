import { IEntityBase } from "./IEntityBase";

export interface IRepository<T extends IEntityBase> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}