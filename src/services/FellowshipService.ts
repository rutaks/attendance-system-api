import { Fellowship } from "../entity/Fellowship";

class FellowshipService {
  static async getFellowships() {
    return Fellowship.find({});
  }
}

export default FellowshipService;
