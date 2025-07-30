import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import cors from "cors"
import { createServer } from "http";
import fs from "fs";
import { intializeSocket } from "./lib/socket.js";
import cron from "node-cron";

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

// app.use(clerkMiddleware({
//   secretKey: process.env.CLERK_SECRET_KEY,
//   publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
// }));

app.use(
  fileUpload({
    useTempFiles: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);


// Cron Jobs for deleting old files from the tmp files
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 0 0 * * *", () => {
  console.log("running a task every day");

  if(fs.existsSync(tempDir)){
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      for (const file of files){
        fs.unlink(path.join(tempDir, file), (err) => {})
      }
    })
  }
});

try {
  console.log("Mounting /api/users...");
app.use("/api/users", userRoutes);

console.log("Mounting /api/auth...");
app.use("/api/auth", authRoutes);

console.log("Mounting /api/admin...");
app.use("/api/admin", adminRoutes);

console.log("Mounting /api/songs...");
app.use("/api/songs", songRoutes);

console.log("Mounting /api/albums...");
app.use("/api/albums", albumRoutes);

console.log("Mounting /api/stats...");
app.use("/api/stats", statRoutes);
} catch (error) {
  console.log("ROUTE ERROR", error);
}

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log("Registered route:", r.route.path);
  }
});

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

httpServer.listen(PORT, () => {
  connectionDB();
  console.log(`server is running at ${PORT}`);
});


