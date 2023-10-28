import { Request, Response } from "express";
import InMemoryDatabase from "../database/Database";

class MessageController {
  public async index(request: Request, response: Response): Promise<any> {
    const db = new InMemoryDatabase();
    db.initializeDatabase();

    try {
      const data: { messages: any[]; count: number } = await new Promise(
        (resolve, reject) => {
          db.getAllMessages(0, 10, (err, result) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(result);
            }
            // Fechar a conexão com o banco de dados
            db.closeDatabase();
          });
        }
      );

      return response.render("index", {
        title: "Fake SMS",
        count: data.count,
        messages: data.messages,
      });
    } catch (error) {
      return response.status(500).send("Erro ao buscar mensagens.");
    }
  }

  public async receive(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { message, recipient, user } = request.query;

    if (!message) {
      return response.status(400).send("Message is required");
    }
    if (!recipient) {
      return response.status(400).send("Recipient is required");
    }
    if (!user) {
      return response.status(400).send("User is required");
    }

    const db = new InMemoryDatabase();
    db.initializeDatabase();

    db.insertMessage(
      String(message),
      String(recipient),
      String(user),
      (err) => {
        if (err) {
          console.error(err);
        }

        db.closeDatabase();
      }
    );

    return response.send({
      message,
      recipient,
    });
  }
  public async getMessages(request: Request, response: Response): Promise<any> {
    const { skip, take } = request.query;

    const db = new InMemoryDatabase();
    db.initializeDatabase();

    try {
      const data: { messages: any[]; count: number } = await new Promise(
        (resolve, reject) => {
          db.getAllMessages(
            Number(skip ?? 0),
            Number(take ?? 10),
            (err, result) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve(result);
              }
              // Fechar a conexão com o banco de dados
              db.closeDatabase();
            }
          );
        }
      );

      return response.send({
        count: data.count,
        messages: data.messages,
      });
    } catch (error) {
      return response.status(500).send("Erro ao buscar mensagens.");
    }
  }
}
export { MessageController };
