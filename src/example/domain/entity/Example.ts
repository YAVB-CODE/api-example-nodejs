import { IEntityBase } from "../interfaces/IEntityBase";

export class Example implements IEntityBase {
  public name: string;
  public id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  toPrimitive(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
