import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import cors from "cors"
import { createServer } from "http";
import { intializeSocket } from "./lib/socket.js";


import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.routes.js";
import { connectionDB } from "./config/db.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT;

const httpServer = createServer(app);
intializeSocket(httpServer);

app.use(cors(
  {
    origin : "http://localhost:3000",
    credentials : true,
  }
))

app.use(express.json());

app.use(clerkMiddleware());

app.use(
  fileUpload({
    useTempFiles: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
});

httpServer.listen(5000, () => {
  connectionDB();
  console.log(`server is running at ${PORT}`);
});


