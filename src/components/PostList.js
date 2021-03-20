import React, { useEffect, useState } from "react";
// import "./Post.css";
import firebase from "firebase";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getMarkers() {
      const events = await firebase.firestore().collection("posts");
      console.log(events);
      const postData = await events
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          return tempDoc;
        })
        .then((data) => {
          console.log(data);
          return data;
        });
      setPosts(postData);
      console.log(posts);
    }
    getMarkers();
  }, [posts]);

  return (
    <div>
      {posts
        ? posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })
        : null}
    </div>
  );
};

export default PostList;
