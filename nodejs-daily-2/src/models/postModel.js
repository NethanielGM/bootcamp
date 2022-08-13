import axios from "axios";

const readAllPosts = async () => {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  const postObjects = posts.data.reduce((prevPost, currPost) => {
    const comment = comments.data.filter((comment) => {
      return comment.postId === currPost.id;
    });
    const commentObject = comment.reduce((prevCom, currCom) => {
      return {
        ...prevCom,
        [currCom.id]: {
          postId: currCom.postId,
          name: currCom.name,
          email: currCom.email,
          body: currCom.body,
        },
      };
    }, {});
    return {
      ...prevPost,
      [currPost.id]: {
        userId: currPost.userId,
        title: currPost.title,
        body: currPost.body,
        comment: commentObject,
      },
    };
  }, {});
  return postObjects;
};

const readPost = async (id) => {
  const allPosts = await readAllPosts();
  const post = allPosts[id];
  return post;
};

const writePost = async (req, res) => {
  const allPosts = await readAllPosts();
  const lastKey = Object.keys(allPosts).pop();
  const newPost = {
    userId: parseInt(lastKey) + 1,
    title: req.body.title,
    body: req.body.body,
  };
  if (!newPost.title || !newPost.body) {
    return res.status(400).json({
      msg: "Please include a title and a body",
    });
  }
  // postObjects.push(...postObjects, newPost)
  res.json(newPost);
};

export default {
  readPost,
  readAllPosts,
  writePost,
};
