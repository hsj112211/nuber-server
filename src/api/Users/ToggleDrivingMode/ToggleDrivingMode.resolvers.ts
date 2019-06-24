import { ToggleDrivingModeResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const users: Users = req.users;
        users.isDriving = !users.isDriving;
        users.save();
        return {
          ok: true,
          error: null
        };
      }
    )
  }
};

export default resolvers;
