import { format } from "date-fns";
import sqlite3 from "sqlite3";

class InMemoryDatabase {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("messageDb.sqlite");
  }

  public initializeDatabase(): void {
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY,message TEXT,recipient TEXT,timestamp DATETIME)"
      );
    });
  }

  public insertMessage(
    message: string,
    recipient: string,
    callback: (err: Error | null) => void
  ): void {
    const currentDateTime = new Date();
    const formattedDateTime = format(currentDateTime, "dd/MM/yyyy HH:mm:ss");

    this.db.run(
      "INSERT INTO messages (message,recipient,timestamp) VALUES (?,?,?)",
      [message, recipient, formattedDateTime],
      callback
    );
  }

  public getAllMessages(
    callback: (err: Error | null, rows: any[]) => void
  ): void {
    this.db.all(
      "SELECT id, message, recipient,  timestamp FROM messages ",
      callback
    );
  }

  public closeDatabase(): void {
    this.db.close();
  }
}

export default InMemoryDatabase;
