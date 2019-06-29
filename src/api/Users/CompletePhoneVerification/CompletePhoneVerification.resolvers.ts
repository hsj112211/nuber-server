import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import Verification from "../../../entities/Verification";
import createJWT from "../../../utils/createJWT";
const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });
        if (!verification) {
          return {
            ok: false,
            error: "Verification key not valid",
            token: null
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      try {
        const users = await Users.findOne({ phoneNumber });
        if (users) {
          users.verifiedPhoneNumber = true;
          users.save();
          const token = createJWT(users.id);
          console.log(token);
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: true,
            error: null,
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
