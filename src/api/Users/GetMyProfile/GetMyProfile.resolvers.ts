import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      const { users } = req;
      return {
        ok: true,
        error: null,
        users
      };
    })
  }
};

export default resolvers;
