import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import userAuthRoutes from "./routes/userRoutes.js";
import adminProductsRouter from "./routes/admin/products-routes.js";
import shopProductsRouter from "./routes/shop/products-routes.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/adress-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";
import commonFeatureRouter from "./routes/common/feature-routes.js";
import orderPaymentRouter from "./routes/shop/order-routes.js";
import adminOrderRoutes from "./routes/admin/order-routes.js"; 
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

const app = express();
const port = process.env.PORT;

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Serve static assets from client/dist
// app.use(express.static(path.join(__dirname, "../client/dist")));

// // For any other request, serve index.html from client/dist
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });



app.use(express.json());
app.use(cookieParser());
app.use(routes);

// Routes setup
app.use("/api/user", userAuthRoutes);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter); // Fixed typo in "address"
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/shop/order", orderPaymentRouter); // Order routes
app.use("/api/admin/orders", adminOrderRoutes); // Order routes


// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
