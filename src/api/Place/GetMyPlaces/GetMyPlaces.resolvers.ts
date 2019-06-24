import { GetMyPlacesResponse } from "src/types/graph";
import Users from "../../../entities/Users";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, __, { req }): Promise<GetMyPlacesResponse> => {
        try {
          const users = await Users.findOne({ id: req.users.id }, { relations: ["places"] });
          if (users) {
            return {
              ok: true,
              places: users.places,
              error: null
            };
          } else {
            return {
              ok: false,
              places: null,
              error: "Users not found"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null
          };
        }
      }
    )
  }
};
export default resolvers;
