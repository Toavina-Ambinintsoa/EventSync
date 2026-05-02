import { verifyToken } from "../utils/jwt";

export function requireAuth(req: Request) {
    const auth = req.headers.get("authorization");

    if (!auth) throw new Error("No token");

    const token = auth.split(" ")[1];

    return verifyToken(token);
}