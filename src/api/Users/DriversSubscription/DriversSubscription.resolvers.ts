import { withFilter } from "graphql-yoga";
import Users from "../../../entities/Users";

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { context }) => {
          //console.log(`This is coming from ReportMovement Resolver `, payload);
          //console.log(`Listening`, context);
          const users: Users = context.currentUsers;
          const {
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng
            }
          } = payload;
          const { lastLat: usersLastLat, lastLng: usersLastLng } = users;
          return (
            driverLastLat >= usersLastLat - 0.05 &&
            driverLastLat <= usersLastLat + 0.05 &&
            driverLastLng >= usersLastLng - 0.05 &&
            driverLastLng <= usersLastLng + 0.05
          );
        }
      )
    }
  }
};
export default resolvers;
