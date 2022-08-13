import postModel from "../models/postModel.js";

const getPosts = async (req, res, next) => {
  try {
    const postsObjects = await postModel.readAllPosts();
    res.send(postsObjects);
  } catch (error) {
    next(error);
    res.status(500).send(error.message);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await postModel.readPost(req.params.id);
    res.send(post);
  } catch (error) {
    next(error);
    res.status(500).send(error.message);
  }
};

const getComments = async (req, res, next) => {
  try {
    const post = await postModel.readPost(req.params.id);
    res.send(post.comment);
  } catch (error) {
    next(error);
    res.status(500).send(error.message);
  }
};

const addPost = async (req, res, next) => {
  try {
    postModel.writePost(req, res);
  } catch (error) {
    next(error);
    res.status(500).send(error.message);
  }
};

export default { getPosts, getPost, getComments, addPost };
