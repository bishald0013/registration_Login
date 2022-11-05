import UserModel from "../models/User.js";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import transport from "../config/emailConfig.js";

//Register an user
class UserController {
  static UserRegistration = async (req, res) => {
    //storing what the user has send through body by using object destructuring
    const { name, email, password, confirm_password, tc } = req.body;

    //searching an user from databse with same email-id that is been requested from client
    const userEmail = await UserModel.findOne({ email: email });

    //if user is not found then create a new user or return error
    if (!userEmail) {
      //if user has provided all the field then create user
      if (name && email && password && confirm_password && tc) {
        //if both the password has matched if it match then create a user
        if (password === confirm_password) {
          try {
            //hashing password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            //creating newUser useing UserModel
            const newUser = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
            });

            //saving our newUser in our mongoDB
            await newUser.save();

            const userID = await UserModel.findOne({ email: email });

            //signing a new jwt token when user is signeup
            const token = jwt.sign(
              { userID: userID._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            res
              .status(201)
              .send({ status:"success", message:"Successfully created user", token: token });
          } catch (error) {
            console.log(error);
            res.send({ status: "fail", message: "something went wrong!" });
          }
        } else {
          res.send({
            status: "fail",
            message: "password and confirm_password does't match ",
          });
        }
      } else {
        res.send({ status: "fail", message: "All fields are required" });
      }
    } else {
      res.send({ status: "fail", message: "email alredy exists" });
    }
  };

  //Loging the user in
  static UserLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const userEmail = await UserModel.findOne({ email: email });

        if (userEmail !== null) {
          const comparePassword = await bcrypt.compare(
            password,
            userEmail.password
          );
          if ((userEmail.email === email) && comparePassword) {
            //signing an new jwt token in login so the user can access it after the login
            const token = jwt.sign(
              { userId: userEmail._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            res.status(200).send({
              status: "success",
              message: "successsfully login",
              "token": token,
              "tc": true
            });
          } else {
            res.status(400).send({
              status: "fail",
              message: "Email or password doesnot match",
              "tc": false
            })
          }
        } else {
          res.status(400).send({ "status":"failed", "message":"Email is not found", "tc": false });
        }
      } else {
        res
          .status(400)
          .send({ "status": "failed", "message": "email and password required for login", "tc": false });
      }
    } catch (error) {
      res.send(error);
    }
  };

  //Delete a specific user using id
  static DeleteUser = async (req, res) => {
    try {
      UserModel.deleteMany({ _id: req.params.id }, (err) => {
        if (!err) {
          res.status(200).send({ "status": "success" });
        } else {
          res.status(400).send({ "status": "fail" });
        }
      });
    } catch (error) {
      res.status(400).send("something went wrong!");
    }
  };

  //change password
  static ChangePassword = async (req, res) => {
    try {
      const { password, confirm_password } = req.body;
      if (password === confirm_password) {
        const salt = await bcrypt.genSalt(10);
        const newHashed_password = await bcrypt.hash(password, salt);

        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashed_password },
        });

        res
          .status(201)
          .send({ status: "success", message: "password successfully updated" });
      } else {
        res
          .status(400)
          .send({ status: "fail", message: "password doesnot match" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };

  //get user login Data
  static LoggedUser = async (req, res) => {
    try {
      res.status(200).send({ user: req.user });
    } catch (error) {
      res.status(400).send({"status": "fail", "mesage": "User is not login"})
    }
  };

  //Reset user password
  static ResetUserPassword = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "1d",
        });
        const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);

        //Send email
        let info = await transport.sendMail({
          from: "bishaldeb282@gmail.com",
          to: user.email,
          subject: "Reset Password link",
          html: `<a href=${link}>Click here </a> to reset your password`
        })

        res
          .status(200)
          .send({
            "status": "success",
            "message": "Pasword reset link sent successfully",
            "info": info
          });
      } else {
        res.status(400).send({ status: "fail", message: "user not found" });
      }
    } else {
      res.status(400).send({ status: "fail", message: "email id require!" });
    }
  };

  static UserPasswordReset = async (req, res) => {
    const { password, confirm_password } = req.body; 
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && confirm_password) {
        if (password === confirm_password) {
          const salt = await bcrypt.genSalt(10);
          const hashed_password = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: hashed_password },
          });
          res
            .status(200)
            .send({ status: "success", messasge: "password set successfully" });
        } else {
          res
            .status(400)
            .send({
              status: "fail",
              messasge: "password and confirm_password doesnot match",
            });
        }
      } else {
        res
          .status(400)
          .send({ status: "fail", messasge: "both the fields are required" });
      }
    } catch (error) {}
  };
}

export default UserController;
