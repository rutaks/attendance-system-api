import { Router } from "express";
import auth from "./auth";
import members from "./members";
import branches from "./branches";

const routes = Router();

routes.use("/auth", auth);
routes.use("/members", members);
routes.use("/branches", branches);

export default routes;
