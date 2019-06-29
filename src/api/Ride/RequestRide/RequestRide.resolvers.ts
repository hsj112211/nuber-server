import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { RequestRideMutationArgs, RequestRideResponse } from "src/types/graph";
import Users from "../../../entities/Users";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req }
      ): Promise<RequestRideResponse> => {
        const users: Users = req.users;
        try {
          const ride = await Ride.create({ ...args, passenger: users }).save();
          return {
            ok: true,
            error: null,
            ride
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          };
        }
      }
    )
  }
};
export default resolvers;
