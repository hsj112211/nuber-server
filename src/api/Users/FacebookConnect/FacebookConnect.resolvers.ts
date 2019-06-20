import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        const existingUsers = await Users.findOne({ fbId });
        if (existingUsers) {
          const token = createJWT(existingUsers.id);
          return {
            ok: true,
            error: null,
            token
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
        const newUsers = await Users.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        const token = createJWT(newUsers.id);
        return {
          ok: true,
          error: null,
          token
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
