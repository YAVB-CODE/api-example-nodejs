import { Request, Response } from "express";
import { GetAllExample } from "../../application/GetAllExample";

export class GetAllExampleController {
  constructor(private readonly getAllExample: GetAllExample) {}

  async handle(req: Request, res: Response) {
    const examples = await this.getAllExample.execute();
    res.json(examples.map((example) => example.toPrimitive()));
  }
}
