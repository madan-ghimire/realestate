import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;
const JWT_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN;

console.log("check jwt token expires in", JWT_TOKEN_EXPIRES_IN);

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

export const generateToken = (
  userId: string,
  role: string,
  username: string,
  email: string
) => {
  return jwt.sign({ id: userId, role, username, email }, SECRET_KEY, {
    expiresIn: JWT_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
