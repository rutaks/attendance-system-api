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

router.put(
  "/:memberId",
  [checkJwt, checkRole(["ADMIN", "CONSUMER"])],
  MemberController.modifyMember
);

router.delete(
  "/:memberId",
  [checkJwt, checkRole(["ADMIN", "CONSUMER"])],
  MemberController.removeMember
);

router.get(
  "/",
  [checkJwt, checkRole(["ADMIN", "CONSUMER"])],
  MemberController.getMembers
);

router.get(
  "/:memberId",
  [checkJwt, checkRole(["ADMIN", "CONSUMER"])],
  MemberController.getMemberById
);

export default router;
