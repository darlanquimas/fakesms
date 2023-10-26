import { Router } from "express";
import { MessageController } from "../controllers/MessageController";

const routes = Router();

routes.get("/", new MessageController().index);
routes.get("/api/message", new MessageController().receive);

export default routes;
