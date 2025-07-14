import { IRepository } from "../../domain/interfaces/IRepository";
import { Example } from "../../domain/entity/Example";
import { MysqlConnection } from "./MysqlConnection";
import { ExamplePersistenceDto } from "../dto/ExamplePersistenceDto";

export class ExampleRepositoryMysql implements IRepository<Example> {
  constructor(private readonly connection: MysqlConnection) {}

  async delete(id: string): Promise<void> {
    await this.connection
      .getInstanceWriter()
      .query("DELETE FROM examples WHERE id = ?", [id]);
  }

  async findById(id: string): Promise<Example | null> {
    const [rows] = await this.connection
      .getInstanceReader()
      .query<ExamplePersistenceDto[]>("SELECT * FROM examples WHERE id = ?", [id]);

    if (rows.length !== 0) {
      const example = rows[0];
      return new Example(example.id, example.name);
    }

    return null;
  }

  async findAll(): Promise<Example[]> {
    const [rows] = await this.connection
      .getInstanceReader()
      .query<ExamplePersistenceDto[]>("SELECT id, name FROM examples");

    if (rows.length !== 0) {
      return rows.map((example) => new Example(example.id, example.name));
    }
    return [];
  }

  async save(example: Example): Promise<void> {
    await this.connection
      .getInstanceWriter()
      .query("INSERT INTO examples (id, name) VALUES (?, ?)", [
        example.id,
        example.name,
      ]);
  }
}
