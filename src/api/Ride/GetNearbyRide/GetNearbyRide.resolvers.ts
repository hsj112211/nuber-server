import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Users from "../../../entities/Users";
import { GetNearbyRideResponse } from "src/types/graph";
import { getRepository, Between } from "typeorm";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRideResponse> => {
        const users: Users = req.users;
        if (users.isDriving) {
          const { lastLat, lastLng } = users;
          try {
            const ride = await getRepository(Ride).findOne({
              status: "REQUESTING",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            if (ride) {
              return {
                ok: true,
                error: null,
                ride
              };
            } else {
              return {
                ok: true,
                error: null,
                ride: null
              };
            }
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
            error: "You are not Driver",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
