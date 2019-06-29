import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../..//utils/privateResolver";
import Users from "../../../entities/Users";
import { GetNearbyDriversResponse } from "src/types/graph";
import { Between, getRepository } from "typeorm";
const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: privateResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const users: Users = req.users;
        const { lastLat, lastLng } = users;
        try {
          const drivers = await getRepository(Users).find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05)
          });
          return {
            ok: true,
            error: null,
            drivers
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null
          };
        }
      }
    )
  }
};
export default resolvers;
