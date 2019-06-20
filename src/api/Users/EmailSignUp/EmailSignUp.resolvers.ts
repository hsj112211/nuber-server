import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import createJWT from "../../../utils/createJWT";
const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
      const { email } = args;
      try {
        const existingUsers = await Users.findOne({ email });
        if (existingUsers) {
          return {
            ok: false,
            error: "You should log in instead",
            token: null
          };
        } else {
          const newUsers = await Users.create({ ...args }).save();
          const token = createJWT(newUsers.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (errpr) {
        return {
          ok: false,
          error: errpr.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
