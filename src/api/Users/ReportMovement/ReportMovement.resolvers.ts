import { ReportMovementMutationArgs, ReportMovementResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Users from "../../..//entities/Users";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (_, args: ReportMovementMutationArgs, { req }): Promise<ReportMovementResponse> => {
        const users: Users = req.users;
        const notNull = cleanNullArgs(args);
        try {
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
