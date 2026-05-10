const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const usersRouter = require("./routers/users/usersRouter");
const connectDB = require("./config/database");
const {
  notFound,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");
const categoriesRouter = require("./routers/category/CategoriesRouter");
const postsRouter = require("./routers/post/PostsRouter");
const commentsRouter = require("./routers/comments/commentsRouter");

//! Create an express app
const app = express();

//! Load the environment variables
dotenv.config();

//! Establish connection to MongoDB
// Note: In serverless, this may be called every time a function wakes up.
connectDB();

//! Set up the middleware

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Very important for Vercel: handle preflight requests globally
app.options("{/*path}", cors(corsOptions));

app.use(express.json());

//? Root Route (Fixes the "Cannot find route for /" error)
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

//? Setup the routers
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentsRouter);

//! Not Found Error middleware
app.use(notFound);

//! Global error handling
app.use(globalErrorHandler);

//! ONLY listen if not running on Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 9080;
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
}

// CRITICAL for Vercel
module.exports = app;
