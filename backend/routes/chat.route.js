import express from "express"
import { getAiMessage } from "../controller/chat.controller.js"


const router = express.Router()

router.post("/send-message", getAiMessage)


export default router