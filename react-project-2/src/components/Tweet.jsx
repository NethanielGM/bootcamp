import { nanoid } from "nanoid";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Tweet = () => {
  const { tweets, handleScroll } = useContext(UserContext);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // didnt have time to use an observer
  });

  return tweets.map((Tweet) => (
    <div className="tweet-row" key={nanoid()}>
      <img width="100" height="100" src={Tweet.avatar} />
      <br />
      <div>
        <h2>{Tweet.userName}</h2>
        <p>{Tweet.content}</p>
        <br />
        <div>
          <span>{Tweet.date}</span>
          <br />
        </div>
      </div>
    </div>
  ));
};

export default Tweet;
