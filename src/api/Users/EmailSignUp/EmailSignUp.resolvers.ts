import { EmailSignUpMutationArgs, EmailSignUpResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import Verification from "../../../entities/Verification";
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";
const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
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
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true
          });
          if (phoneVerification) {
            const newUsers = await Users.create({ ...args }).save();
            if (newUsers.email) {
              const emailVerification = await Verification.create({
                payload: newUsers.email,
                target: "EMAIL"
              }).save();
              await sendVerificationEmail(
                newUsers.fullName,
                emailVerification.key
              );
            }
            const token = createJWT(newUsers.id);
            return {
              ok: true,
              error: null,
              token
            };
          } else {
            return {
              ok: false,
              error: "You Haven't verified your phone number",
              token: null
            };
          }
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
