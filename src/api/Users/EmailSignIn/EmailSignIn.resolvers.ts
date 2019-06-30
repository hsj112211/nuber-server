import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import createJWT from "../../../utils/createJWT";
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
        console.log(checkPassword);
        if (checkPassword) {
          const token = createJWT(users.id);

          return {
            ok: true,
            error: null,
            token
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
