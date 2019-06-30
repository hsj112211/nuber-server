import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../..//utils/privateResolver";
import Users from "../../..//entities/Users";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "src/types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req }
      ): Promise<UpdateRideStatusResponse> => {
        const users: Users = req.users;
        if (users.isDriving) {
          try {
            let ride;
            if (args.status === "ACCEPTED") {
              ride = Ride.findOne(
                {
                  id: args.rideId,
                  status: "REQUESTING"
                },
                { relations: ["passenger"] }
              );
              if (ride) {
                ride.driver = users;
                users.isTaken = true;
                users.save();
              }
            } else {
              ride = await Ride.findOne({
                id: args.rideId
              });
            }
            if (ride) {
              ride.status = args.status;
              ride.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Can't update ride"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not driving"
          };
        }
      }
    )
  }
};

export default resolvers;
