const jwt = require("jsonwebtoken");
const BlackList = require("../models/balcklist.model");
const authMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    req.user = { id: "adminTestId", role: "admin" }; // Mock user info

    return next();
  }
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ error: "Not Authorized" });
  }

  try {
    let blackListed = await BlackList.findOne({ token });
    
    if (blackListed) {
      return res.status(401).send({ error: "Not Authorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    
    next();
  } catch (error) {
    res.status(401).send({ error: "Not Authorized" });
  }
};

module.exports = authMiddleware;
