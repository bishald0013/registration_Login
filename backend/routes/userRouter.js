import express from "express";
const router = express.Router()
import UserController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

//Router level middleware to - To protected route
router.use("/changepassword", authMiddleware)
router.use("/loggedUser", authMiddleware)


// Public Route
router.post("/register", UserController.UserRegistration)
router.post("/login", UserController.UserLogin)

router.post("/set-reset-password-email", UserController.ResetUserPassword)
router.post("/reset-password/:id/:token", UserController.UserPasswordReset)

router.delete("/delete/:id", UserController.DeleteUser)

// Protected Route
router.patch("/changepassword", UserController.ChangePassword)
router.get("/loggedUser", UserController.LoggedUser)

export default router
