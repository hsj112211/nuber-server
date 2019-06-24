import { CompleteEmailVerificationMutationArgs, CompleteEmailVerificationResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import Verification from "../../../entities/Verification";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (_, args: CompleteEmailVerificationMutationArgs, { req }): Promise<CompleteEmailVerificationResponse> => {
        const users: Users = req.users;
        const { key } = args;
        if (users.email) {
          try {
            const verification = await Verification.findOne({
              key,
              payload: users.email
            });
            if (verification) {
              users.verifiedEmail = true;
              users.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Cant verify email"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "No email to verify"
          };
        }
      }
    )
  }
};

export default resolvers;
