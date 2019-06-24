import { AddPlaceMutationArgs, AddPlaceResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Place from "../../../entities//Place";
import Users from "../../../entities//Users";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(
      async (_, args: AddPlaceMutationArgs, { req }): Promise<AddPlaceResponse> => {
        const users: Users = req.users;
        try {
          await Place.create({ ...args, users }).save();
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
