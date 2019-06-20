import jwt from "jsonwebtoken";
import Users from "../entities/Users";
const decodeJWT = async (token: string): Promise<Users | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const users = await Users.findOne({ id });
    return users;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
