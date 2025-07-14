import { createPool, Pool, PoolOptions } from "mysql2/promise";

export class MysqlConnection {
  private static instanceWriter: Pool;
  private static instanceReader: Pool;

  getParamsPool(): PoolOptions {
    return {
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    };
  }

  public getInstanceWriter(): Pool {
    if (!MysqlConnection.instanceWriter) {
      MysqlConnection.instanceWriter = createPool({
        ...this.getParamsPool(),
        host: process.env.DB_HOST_WRITER,
      });
    }

    return MysqlConnection.instanceWriter;
  }

  public getInstanceReader(): Pool {
    if (!MysqlConnection.instanceReader) {
      MysqlConnection.instanceReader = createPool({
        ...this.getParamsPool(),
        host: process.env.DB_HOST_READER,
      });
    }

    return MysqlConnection.instanceReader;
  }
}
