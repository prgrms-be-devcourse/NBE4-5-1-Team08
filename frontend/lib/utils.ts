import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// JWT 관련 유틸 함수
const JWT_SECRET = (process.env.JWT_SECRET as string) || "default_secret";

export function generateJWT(payload: object, expiresIn: string = "1h"): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyJWT(token: string): object | null {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.verify(token, JWT_SECRET) as object;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}
