import { Branch } from "../entity/Branch";
import ErrorHandler from "../models/ErrorHandler";

class BranchService {
  static async getBranches() {
    return Branch.find({});
  }

  static async createBranch(name: string) {
    try {
      if (!name || name.length < 1) {
        throw new Error("Provide a branch name");
      }
      const branch = new Branch();
      branch.name = name;
      return await branch.save();
    } catch (error) {
      throw new ErrorHandler(400, `${error}`);
    }
  }

  static async modifyBranch(id: string, name: string) {
    try {
      if (!id || id.length < 1) {
        throw new Error("Provide a branch id");
      }
      if (!name || name.length < 1) {
        throw new Error("Provide a branch name");
      }
      const branch = await Branch.findOneOrFail(id);
      branch.name = name;
      return await branch.save();
    } catch (error) {
      throw new ErrorHandler(400, `${error}`);
    }
  }

  static async removeBranch(id: string) {
    try {
      if (!id || id.length < 1) {
        throw new Error("Provide a branch id");
      }
      const { affected } = await Branch.delete(id);
      if (!affected) {
        throw new Error("Branch not found");
      }
      return true;
    } catch (error) {
      throw new ErrorHandler(400, `${error}`);
    }
  }
}

export default BranchService;