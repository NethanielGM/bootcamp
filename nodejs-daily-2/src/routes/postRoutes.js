import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/", postController.addPost);

router.get("/:id", postController.getPost);
router.get("/:id/comments", postController.getComments);
// router.put("/:id/:commentId", postController.editPost);

export default router;
