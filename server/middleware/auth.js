const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-access-token");
    if (!token){
      return res
        .status(401)
        .json({ success: false, error: "No authentication token, authorization denied." });
    }      

    const verified = jwt.verify(token, process.env.APP_SECRET_KEY);

    if (!verified){
      return res
        .status(401)
        .json({ success: false, error: "Token verification failed, authorization denied." });
    }       

    req.user_id = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;