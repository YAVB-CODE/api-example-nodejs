import { Request, Response } from "express";
import { SaveExample } from "../../application/SaveExample";

export class SaveExampleController {
  constructor(private readonly saveExample: SaveExample) {}

  async handle(req: Request, res: Response) {
    await this.saveExample.execute(req.body);
    res.status(201).send();
  }
}