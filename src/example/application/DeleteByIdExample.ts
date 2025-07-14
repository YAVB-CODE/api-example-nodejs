import { IRepository } from "../domain/interfaces/IRepository";
import { Example } from "../domain/entity/Example";

export class DeleteByIdExample {
  constructor(private readonly repository: IRepository<Example>) {}

  async execute(id: string): Promise<void> {
    const example = await this.repository.findById(id);
    if (!example) {
      throw new Error("Example not found");
    }
    await this.repository.delete(example.id);
  }
}