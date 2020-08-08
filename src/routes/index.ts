import { checkJwt } from "./../middlewares/checkJwt";
import { checkRole } from "./../middlewares/checkRole";
import { Router } from "express";
import auth from "./auth";
import members from "./members";

const routes = Router();

routes.use("/auth", auth);
routes.use("/members", members);

export default routes;
