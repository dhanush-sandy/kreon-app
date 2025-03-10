import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables first

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import NotesRoutes from "./routes/notes.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
const corsOptions = {
  origin: "http://localhost:5174",
  credentials: true, // ✅ Fix typo: `credential` → `credentials`
};
app.use(cors(corsOptions));

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parses URL-encoded data

// ✅ API Routes
app.use("/api/v1/notes", NotesRoutes);

// ✅ Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1); // Exit process on failure
  }
};

startServer();
