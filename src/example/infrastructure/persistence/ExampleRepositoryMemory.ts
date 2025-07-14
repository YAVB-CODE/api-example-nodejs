import { IRepository } from "../../domain/interfaces/IRepository";
import { Example } from "../../domain/entity/Example";

export class ExampleRepositoryMemory implements IRepository<Example> {
  private examples: Example[] = [
    new Example("Example 1", "1"),
  ];

  findById(id: string): Promise<Example | null> {
    return Promise.resolve(
      this.examples.find((example) => example.id === id) || null
    );
  }
  save(entity: Example): Promise<void> {
    this.examples.push(entity);
    return Promise.resolve();
  }
  delete(id: string): Promise<void> {
    this.examples = this.examples.filter((example) => example.id !== id);
    return Promise.resolve();
  }

  async findAll(): Promise<Example[]> {
    return this.examples.map((example) => new Example(example.id, example.name));
  }
}
