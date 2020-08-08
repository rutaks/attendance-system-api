import { checkRole } from "./../middlewares/checkRole";
import { checkJwt } from "./../middlewares/checkJwt";
import { Router } from "express";
import BranchController from "../controllers/BranchController";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], BranchController.getBranches);

router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  BranchController.createBranch
);

router.put(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  BranchController.modifyBranch
);

router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  BranchController.removeBranch
);

export default router;
