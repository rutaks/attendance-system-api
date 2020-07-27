import { checkRole } from "./../middlewares/checkRole";
import { checkJwt } from "./../middlewares/checkJwt";
import { Router } from "express";
import AuthController from "../controllers/AuthController";
import TestingController from "../controllers/TestingController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/test", [checkJwt, checkRole(["ADMIN"])], TestingController.test);

export default router;
