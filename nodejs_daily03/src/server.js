import express from "express";
import "dotenv/config";
import serverRoutes from "./routes/serverRoutes.js";
import serverModel from "./models/serverModel.js";

const app = express();
app.use(express.json());
app.use("/", serverModel.logger, serverRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
