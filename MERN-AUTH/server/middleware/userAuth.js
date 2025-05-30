import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      succes: false,
      message: "Unauthorized, please login again",
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({
        succes: false,
        message: "Unauthorized, please login again",
      });
    }
    next();
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
};

export default userAuth;
