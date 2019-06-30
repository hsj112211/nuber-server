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
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const users: Users = req.users;
        if (users.isRiding) {
          try {
            const ride = await Ride.create({
              ...args,
              passenger: users
            }).save();
            pubSub.publish("reideRequest", { NearbyRideSubScription: ride });
            users.isRiding = true;
            users.save();
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
        } else {
          return {
            ok: false,
            error: "You can't request tow rides",
            ride: null
          };
        }
      }
    )
  }
};
export default resolvers;
