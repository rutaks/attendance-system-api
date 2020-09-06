import { Router } from "express";
import auth from "./auth";
import members from "./members";
import branches from "./branches";
import fellowships from "./fellowships";
import services from "./services";

const routes = Router();

routes.use("/auth", auth);
routes.use("/members", members);
routes.use("/branches", branches);
routes.use("/fellowships", fellowships);
routes.use("/services", services);

export default routes;
