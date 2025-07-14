import { IRepository } from "../domain/interfaces/IRepository";
import { Example } from "../domain/entity/Example";

export class GetAllExample {
  constructor(private readonly repository: IRepository<Example>) {}

  async execute(): Promise<Example[]> {
    return this.repository.findAll();
  }
}