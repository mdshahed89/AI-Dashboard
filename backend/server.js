import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConfig.js";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
// dbConnect();

const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 4801;

// if (process.env.NODE_ENV !== "production") {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// }

export default app;
