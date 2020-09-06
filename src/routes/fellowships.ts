import { checkRole } from "../middlewares/checkRole";
import { checkJwt } from "../middlewares/checkJwt";
import { Router } from "express";
import FellowshipController from "../controllers/FellowshipController";

const router = Router();

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN", "CONSUMER"])],
  FellowshipController.getFellowships
);

export default router;
