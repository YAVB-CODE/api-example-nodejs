import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.APP_ENV === "production" ? ".env" : ".env.example",
});

import { GetAllExampleController } from "./example/infrastructure/http/GetAllExampleController";
import { GetAllExample } from "./example/application/GetAllExample";
import { GetByIdExampleController } from "./example/infrastructure/http/GetByIdExampleController";
import { GetByIdExample } from "./example/application/GetByIdExample";
import { SaveExampleController } from "./example/infrastructure/http/SaveExampleController";
import { SaveExample } from "./example/application/SaveExample";
import { DeleteExampleController } from "./example/infrastructure/http/DeleteExampleController";
import { DeleteByIdExample } from "./example/application/DeleteByIdExample";
import { ErrorManager } from "./example/infrastructure/tracing/ErrorManager";
import { ErrorHandlingMiddleware } from "./example/infrastructure/middleware/ErrorHandlingMiddleware";
import { ExampleRepositoryMysql } from "./example/infrastructure/persistence/ExampleRepositoryMysql";
import { MysqlConnection } from "./example/infrastructure/persistence/MysqlConnection";

const app = express();
app.use(express.json());

const exampleRepository = new ExampleRepositoryMysql(new MysqlConnection());

const getAllExampleUseCase = new GetAllExample(exampleRepository);
const getByIdExampleUseCase = new GetByIdExample(exampleRepository);
const saveExampleUseCase = new SaveExample(exampleRepository);
const deleteByIdExampleUseCase = new DeleteByIdExample(exampleRepository);

const getAllExampleController = new GetAllExampleController(getAllExampleUseCase);
const getByIdExampleController = new GetByIdExampleController(getByIdExampleUseCase);
const saveExampleController = new SaveExampleController(saveExampleUseCase);
const deleteExampleController = new DeleteExampleController(deleteByIdExampleUseCase);

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/example", asyncHandler(getAllExampleController.handle.bind(getAllExampleController)));
app.get("/example/:id", asyncHandler(getByIdExampleController.handle.bind(getByIdExampleController)));
app.post("/example", asyncHandler(saveExampleController.handle.bind(saveExampleController)));
app.delete("/example/:id", asyncHandler(deleteExampleController.handle.bind(deleteExampleController)));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  new ErrorHandlingMiddleware(new ErrorManager()).handle(err, req, res, next);
});

if (!process.env.PORT) {
  throw new Error("PORT is not set");
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
