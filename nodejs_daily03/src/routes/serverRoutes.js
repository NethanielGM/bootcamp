import express from "express";
import serverController from "../controllers/serverController.js";

const router = express.Router();

router.route("/").get(serverController.getData).post(serverController.addData);

export default router;
