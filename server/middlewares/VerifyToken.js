// server/middlewares/VerifyToken.js
import auth from "../config/firebase-config.js";

export const VerifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodeValue = await auth.verifyIdToken(token);
    req.user = decodeValue;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const VerifySocketToken = async (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const decodeValue = await auth.verifyIdToken(token);
    socket.user = decodeValue;
    return next();
  } catch (e) {
    return next(new Error("Unauthorized"));
  }
};
