import { DeletePlaceMutationArgs, DeletePlaceResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Place from "../../../entities/Place";
import Users from "../../../entities/Users";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (_, args: DeletePlaceMutationArgs, { req }): Promise<DeletePlaceResponse> => {
        const users: Users = req.users;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.usersId === users.id) {
              place.remove();
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
