import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/OrderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// Check for essential environment variables
if (
  !process.env.MONGODB_URI ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Missing critical environment variables.");
  process.exit(1); // Exit the process if important env variables are missing
}

// connect to the database and start the server
connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Terminate if unable to connect to the database
  });

// Connect to Cloudinary
try {
  connectCloudinary();
  console.log("Cloudinary connected");
} catch (error) {
  console.error("Cloudinary connection error:", error);
  process.exit(1); // Terminate if Cloudinary connection fails
}

// middleware configuration
app.use(express.json());

// CORS configuration
// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    credentials: true, // Allow credentials if needed (like cookies)
  })
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// Default route for health check
app.get("/", (req, res) => {
  res.status(200).send("Hello from Express Server");
});

// Handling unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});
