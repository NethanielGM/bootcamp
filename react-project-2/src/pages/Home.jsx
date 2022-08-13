import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import TweetForm from "../components/TweetForm";
import Tweet from "../components/Tweet";
import { auth, db } from "../firebase-config";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const Home = () => {
  let navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const { isAuth } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const postsCollectionRef = collection(db, "posts");
  const tweetsQuery = query(
    postsCollectionRef,
    orderBy("date", "desc"),
    limit(10)
  );
  const tweetsQueryLoading = query(
    postsCollectionRef,
    orderBy("date", "desc"),
    limit(10),
    startAfter(lastDoc)
  );

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    let isSubscribed = true;
    fetchWithFireBase(tweetsQuery);
    return () => {
      isSubscribed = false;
    };
  }, []);

  const fetchWithFireBase = async (query) => {
    onSnapshot(query, (doc) => {
      if (doc.docs.length) {
        const newTweets = doc.docs.map((doc) => doc.data());
        const lastVisible = doc.docs[doc.docs.length - 1];
        setLastDoc(lastVisible);
        setTweets([...tweets, ...newTweets]);
        setIsLoading(false);
      }
    });
    window.removeEventListener("scroll", handleScroll);
  };
  const handleScroll = async (e) => {
    e.target.documentElement.scrollTop + window.innerHeight + 1 >=
      e.target.documentElement.scrollHeight &&
      fetchWithFireBase(tweetsQueryLoading);
  };
  const addTweet = (newTweet) => {
    if (!newTweet.content || /^\s*$/.test(newTweet.content)) {
      return;
    }
    setTweets([newTweet, ...tweets]);
    postWithFireBase(newTweet);
  };

  const postWithFireBase = async (newTweet) => {
    await addDoc(postsCollectionRef, {
      content: newTweet.content,
      date: newTweet.date,
      userName: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      avatar: auth.currentUser.photoURL,
    });
  };

  return (
    <UserContext.Provider
      value={{
        addTweet,
        tweets,
        handleScroll,
      }}
    >
      <TweetForm />
      {!isLoading && <Tweet />}
    </UserContext.Provider>
  );
};
export default Home;
