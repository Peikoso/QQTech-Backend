import { admin } from "../config/firebase.js";
import { UnauthorizedError } from "../utils/errors.js";

export const AuthService = {
  async verifyToken(idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error("Error verifying Firebase token:", error.message);
      throw new UnauthorizedError("Invalid or expired token.");
    }
  },
};
