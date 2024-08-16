import { NextRequest } from "next/server";
import { JWTPayload } from "./type";
import jwt from "jsonwebtoken";

// Verify token ==> Backend
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) {
      return null;
    }
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    return userPayload;
  } catch (error) {
    return null;
  }
}

// Verify token ==> Frontend
export function verifyTokenForPage(token: string) {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    if (!userPayload) return null;
    return userPayload;
  } catch (error) {
    return null;
  }
}
