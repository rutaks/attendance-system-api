import { checkRole } from "./../middlewares/checkRole";
import { checkJwt } from "./../middlewares/checkJwt";
import { Router } from "express";
import ServiceController from "../controllers/ServiceController";

const router = Router();

router.get("/", [checkJwt], ServiceController.getServices);

router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  ServiceController.createService
);

router.put(
  "/:serviceId",
  [checkJwt, checkRole(["ADMIN"])],
  ServiceController.modifyServices
);

router.delete(
  "/:serviceId",
  [checkJwt, checkRole(["ADMIN"])],
  ServiceController.removeService
);

router.post(
  "/:serviceId/members/:memberId",
  [checkJwt, checkRole(["ADMIN"])],
  ServiceController.addMemberToService
);

router.delete(
  "/:serviceId/members/:memberId",
  [checkJwt, checkRole(["ADMIN"])],
  ServiceController.removeMemberFromService
);

export default router;
