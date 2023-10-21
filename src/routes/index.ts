import { Router } from "express";
import { HomeController } from "../controllers/HomeController";
import { MessageController } from "../controllers/MessageController";

const routes = Router();

routes.get("/", new HomeController().handle);
routes.get("/api/message", new MessageController().handle);

export default routes;
