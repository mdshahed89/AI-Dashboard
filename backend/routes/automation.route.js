import express from "express"
import { searchImages } from "../controller/automation.controller.js"


const router = express.Router()

router.get("/search-images", searchImages)


export default router