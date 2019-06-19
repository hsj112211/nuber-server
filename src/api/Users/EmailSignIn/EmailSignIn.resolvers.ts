import { Resolvers } from "src/types/resolvers";
import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";
import Users from "../../../entities/Users";
const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const users = await Users.findOne({ email });
        if (!users) {
          return {
            ok: false,
            error: "No Users found that email",
            token: null
          };
        }
        const checkPassword = await users.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: "Coming soon"
          };
        } else {
          return {
            ok: false,
            error: "Wrong Password",
            token: null
          };
        }
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
