import React from "react";
import "./Post.css";

const Post = ({ post }) => {
  console.log(post);
  return (
    <div className="post">
      <p className="post__username">
        <strong>{post.username}</strong>
        <span></span>
      </p>
      <p className="post__text">{post.text}</p>
    </div>
  );
};

export default Post;
