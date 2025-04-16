import express from "express"
import { adminLogin, changeEmail, changePassword, createAdmin, forgotPassword, resetPassword } from "../controller/auth.controller.js"
import protect from "../middlewares/protect.middleware.js"

const router = express.Router()

router.post("/create-admin", createAdmin)
router.post("/admin-login", adminLogin)
router.put("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)
router.put("/change-password", protect, changePassword)
router.put("/change-email", protect, changeEmail)

export default router