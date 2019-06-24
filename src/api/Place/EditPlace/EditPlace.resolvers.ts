import { EditPlaceMutationArgs, EditPlaceResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import cleanNullArgs from "../../..//utils/cleanNullArg";
import Place from "../../../entities/Place";
import Users from "../../../entities/Users";
import privateResolver from "../../../utils/privateResolver";
const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (_, args: EditPlaceMutationArgs, { req }): Promise<EditPlaceResponse> => {
        console.log(args);
        const users: Users = req.users;
        try {
          const place = await Place.findOne({ id: args.placeId }, { relations: ["users"] });
          if (place) {
            if (place.usersId === users.id) {
              const notNull = cleanNullArgs(args);
              await Place.update({ id: args.placeId }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized"
              };
            }
          } else {
            return {
              ok: false,
              error: "Place not found"
            };
          }
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
