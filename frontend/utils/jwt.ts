import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!; // .env.local에서 가져오기

// JWT 생성
export const generateToken = (adminId: string) => {
  return jwt.sign({ adminId }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// JWT 검증
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY) as { adminId: string };
  } catch (error) {
    return null;
  }
};
