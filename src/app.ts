import express from "express";
import path from "path";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
const port = 3000;
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(routes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
