const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  const token = req.headers["todo"];
  if (!token) {
    return res.status(404).json({ message: "unauthorized user" });
  }

  let verified;
  try {
    verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "JWT not provided Pleace login ",
      data: error,
    });
  }
  if (verified) {
    req.locals = verified;
    next();
  } else {
    return res.status(400).json({
      status: 400,
      message: "not Authenticated.please login ",
    });
  }
};

module.exports = Auth;
