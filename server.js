import express from "express";
import productRouter from "./routes/product.route.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
