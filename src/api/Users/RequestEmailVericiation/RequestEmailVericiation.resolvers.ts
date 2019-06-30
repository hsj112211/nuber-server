import { RequestEmailVericiationResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import Verification from "../../../entities/Verification";
import privateResolver from "../../../utils/privateResolver";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVericiation: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVericiationResponse> => {
        const users: Users = req.users;
        if (users.email && !users.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: users.email
            });
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: users.email,
              target: "EMAIL"
            }).save();
            await sendVerificationEmail(users.fullName, newVerification.key);
            return {
              ok: true,
              error: null
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "Your users has no email to verify"
          };
        }
      }
    )
  }
};

export default resolvers;
