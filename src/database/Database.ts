import { format } from "date-fns";
import sqlite3 from "sqlite3";

class InMemoryDatabase {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("db.sqlite");
  }

  public initializeDatabase(): void {
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY,message TEXT,recipient TEXT,timestamp DATETIME, sender TEXT)"
      );
    });
  }

  public insertMessage(
    message: string,
    recipient: string,
    user: string,
    callback: (err: Error | null) => void
  ): void {
    const currentDateTime = new Date();
    const formattedDateTime = format(currentDateTime, "dd/MM/yyyy HH:mm:ss");

    this.db.run(
      "INSERT INTO messages (message,recipient,timestamp,sender) VALUES (?,?,?,?) RETURNING  * ",
      [message, recipient, formattedDateTime, user],
      callback
    );
  }

  public getAllMessages(
    callback: (err: Error | null, rows: any[]) => void
  ): void {
    this.db.all(
      "SELECT id, message, recipient, timestamp, sender FROM messages order by timestamp desc ",
      callback
    );
  }

  public closeDatabase(): void {
    this.db.close();
  }
}

export default InMemoryDatabase;
