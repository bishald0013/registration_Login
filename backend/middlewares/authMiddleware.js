import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const VerifyToken = async (req, res, next) => {
  try {
    let token;

    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {

      //taking only token from "Bearer token" from header
      token = authorization.split(" ")[1];
      // console.log(token)

      //Verifiying the user provided token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(userId)
 
      //Get user from token with out password
      req.user = await UserModel.findById(userId).select("-password");
      // console.log(req.user)
      
      next();
    } else {
      res
        .status(400)
        .send({ status: "fail", message: "Token is not authenticated" });
    }
  } catch (error) {
    res.status(400).send({ status: "fail", message: "Some thing went wrong!" });
  }
};

export default VerifyToken;
