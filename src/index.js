import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js"
import userProfileRouter from "./routes/userProfile.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import chatRouter from "./routes/chat.routes.js";
import roleRouter from "./routes/role.routes.js";

dotenv.config();

const app = express();
connectDB();
const PORT =  process.env.PORT || 5000;

app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running properly",
  });
});
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", userProfileRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use(
  "/api/v1/notifications",
  notificationRouter
);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/roles", roleRouter);

app.listen(PORT,()=>{
  console.log(`app is running on PORT ${PORT}`)
})