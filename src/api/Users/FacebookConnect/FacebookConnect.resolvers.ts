import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        const existingUsers = await Users.findOne({ fbId });
        if (existingUsers) {
          return {
            ok: true,
            error: null,
            token: "Coming soon already"
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      try {
        await Users.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        return {
          ok: true,
          error: null,
          token: "Coming soon create"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
