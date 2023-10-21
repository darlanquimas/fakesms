import { Request, Response } from "express";
import InMemoryDatabase from "../database/Database";

class HomeController {
  public async handle(request: Request, response: Response): Promise<any> {
    const db = new InMemoryDatabase();
    db.initializeDatabase();

    try {
      const messages = await new Promise((resolve, reject) => {
        db.getAllMessages((err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log("Itens no banco de dados em memória:");
            console.log(rows);
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
}

export { HomeController };
