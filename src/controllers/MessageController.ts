import { Request, Response } from "express";
import InMemoryDatabase from "../database/Database";

class MessageController {
  public async index(request: Request, response: Response): Promise<any> {
    const db = new InMemoryDatabase();
    db.initializeDatabase();

    try {
      const messages = await new Promise((resolve, reject) => {
        db.getAllMessages((err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }

          // Fechar a conexão com o banco de dados
          db.closeDatabase();
        });
      });

      return response.render("index", {
        title: "Fake SMS",
        messages: messages,
      });
    } catch (error) {
      // Lidar com erros
      return response.status(500).send("Erro ao buscar mensagens.");
    }
  }

  public async receive(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { message, recipient, user } = request.query;
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
}
export { MessageController };
