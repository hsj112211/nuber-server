import { withFilter } from "graphql-yoga";
import Users from "../../../entities/Users";

const resolvers = {
  Subscription: {
    NearbyRideSubScription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
        (payload, _, { context }) => {
          //console.log(`This is coming from ReportMovement Resolver `, payload);
          //console.log(`Listening`, context);
          const users: Users = context.currentUsers;
          const {
            NearbyRideSubScription: { pickUpLat, pickUpLng }
          } = payload;
          const { lastLat: usersLastLat, lastLng: usersLastLng } = users;
          return (
            pickUpLat >= usersLastLat - 0.05 &&
            pickUpLat <= usersLastLat + 0.05 &&
            pickUpLng >= usersLastLng - 0.05 &&
            pickUpLng <= usersLastLng + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
