import jwt from "jsonwebtoken";

/**
 * @param userId : number
 * 작동원리
 * 문자열을 반환하고 이 문자열은 토큰 값을 가지고 있다. ==> 유저아이디를 받고 토큰안에 넣어서 유저아이디를 암호화 한다
 * 유저가 요청을 보낼때 이 토큰을 같이 보내게 된다.
 * 받은 토큰값을 확인하고 이전에 여기에 넣었던 유저 아이디를 같이 확인한다.
 */

const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id
    },
    process.env.JWT_TOKEN || ""
  );
  return token;
};

export default createJWT;
