import { RowDataPacket } from "mysql2";

export interface ExamplePersistenceDto extends RowDataPacket {
  id: string;
  name: string;
}