import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { auth } from "../firebase-config";

const TweetForm = () => {
  const { addTweet } = useContext(UserContext);
  const [content, setContent] = useState("");
  let navigate = useNavigate();
  const handleTweet = (e) => {
    if (!auth.currentUser.photoURL) {
      alert("Add AnImage");
      navigate("/profile");
      return;
    }
    if (!auth.currentUser.displayName) {
      alert("Add A Username");
      navigate("/profile");
      return;
    }
    const date = new Date().toISOString();
    e.preventDefault();
    addTweet({
      content: content,
      date: date,
    });
    setContent("");
  };

  return (
    <form className="tweet-form">
      <textarea
        placeholder="What you have in mind..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        name="text"
        className="tweet-input"
        rows="10"
        cols="10"
      />
      <div className="input-div">
        {content.length > 140 && (
          <span className="tweet-error">
            The tweet can't contain more then 140 chars.
          </span>
        )}
        <span></span>
        <button
          disabled={content.length > 140}
          onClick={handleTweet}
          className="tweet-button"
        >
          Tweet
        </button>
      </div>
    </form>
  );
};

export default TweetForm;
