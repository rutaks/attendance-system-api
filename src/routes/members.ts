import { checkRole } from "./../middlewares/checkRole";
import { checkJwt } from "./../middlewares/checkJwt";
import { Router } from "express";
import MemberController from "../controllers/MemberController";

const router = Router();

router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  MemberController.createMember
);

export default router;
