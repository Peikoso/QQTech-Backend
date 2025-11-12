import { AuthService } from "../services/auth.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedUser = await AuthService.verifyToken(token);
    req.user = decodedUser; // usuário disponível em qualquer controller
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
