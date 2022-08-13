import express from "express";
import "dotenv/config";
import postRoutes from "./routes/postRoutes.js";
const app = express();

app.use(express.json());

app.use("/", postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
