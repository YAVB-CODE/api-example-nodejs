import { Request, Response } from "express";
import { GetByIdExample } from "../../application/GetByIdExample";

export class GetByIdExampleController {
  constructor(private readonly getByIdExample: GetByIdExample) {}

  async handle(req: Request, res: Response) {
    const example = await this.getByIdExample.execute(req.params.id);
    res.json(example?.toPrimitive());
  }
}