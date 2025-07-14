import { Request, Response } from "express";
import { DeleteByIdExample } from "../../application/DeleteByIdExample";

export class DeleteExampleController {
  constructor(private readonly deleteByIdExample: DeleteByIdExample) {}

  async handle(req: Request, res: Response) {
    await this.deleteByIdExample.execute(req.params.id);
    res.status(204).send();
  }
}