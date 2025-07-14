import { IRepository } from "../domain/interfaces/IRepository";
import { Example } from "../domain/entity/Example";

export class SaveExample {
  constructor(private readonly repository: IRepository<Example>) {}

  async execute(example: Example): Promise<void> {
    await this.repository.save(example);
  }
}