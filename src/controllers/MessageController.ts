import { Request, Response } from "express";
import InMemoryDatabase from "../database/Database";

class MessageController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { message, recipient } = request.query;
    const db = new InMemoryDatabase();
    db.initializeDatabase();

    db.insertMessage(String(message), String(recipient), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Item inserido com sucesso!");
      }
      db.closeDatabase();
    });

    return response.send({
      message,
      recipient,
    });
  }
}
export { MessageController };
