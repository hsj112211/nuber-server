import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import Users from "../../../entities/Users";
import { GetNearbyRidesResponse } from "src/types/graph";
import { getRepository, Between } from "typeorm";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRides: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
        const users: Users = req.users;
        if (users.isDriving) {
          const { lastLat, lastLng } = users;
          try {
            const rides = await getRepository(Ride).find({
              status: "REQUESTING",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: true,
              error: null,
              rides
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              rides: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not Driver",
            rides: null
          };
        }
      }
    )
  }
};

export default resolvers;
