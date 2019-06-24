import { Resolvers } from "src/types/resolvers";
import Users from "../../../entities/Users";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (_, args: UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse> => {
        const users: Users = req.users;
        const notNull = cleanNullArgs(args);
        try {
          if (args.password !== null) {
            users.password = args.password;
            users.save();
          }
          await Users.update({ id: users.id }, { ...notNull });
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
      }
    )
  }
};
export default resolvers;
