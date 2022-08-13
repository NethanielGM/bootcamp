import React, { useState, useEffect } from "react";
// import axios from "axios";

function User() {
  const [users, setUser] = useState([]);
  const getUser = async () => {
    const URL =
      // "https://gist.github.com/yonathan06/78ec53b3e243b01aaa9441248d8848f7/user-mock-data.json";
      "https://jsonplaceholder.typicode.com/posts"; // Cant make original api to work, used a dummy api instead
    const response = await fetch(URL);
    const responseData = await response.json();
    setUser(responseData);
  };

  useEffect(() => {
    getUser();
    // axios
    //   .get(URL)
    //   .then((response) => {
    //     console.log(response.data);
    //     setUser(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.title},{user.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
