import { IRepository } from "../domain/interfaces/IRepository";
import { Example } from "../domain/entity/Example";
import { NotFoundException } from "../domain/exception/NotFoundException";

export class GetByIdExample {
  constructor(private readonly repository: IRepository<Example>) {}

  async execute(id: string): Promise<Example | null> {
    const example = await this.repository.findById(id);
    if (!example) {
      throw new NotFoundException("Example not found");
    }
    return new Example(example.id, example.name);
  }
}
