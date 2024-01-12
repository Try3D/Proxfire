import { get } from "../lib/localStorage.ts";
import { DocumentData } from "firebase/firestore";
import "./Posts.css";

interface Data {
  id: string;
  data: DocumentData;
}

function Posts({ post }: { post: Data }) {
  const myPosts = get();

  return (
    <>
      {myPosts.indexOf(post.id) === -1 ? (
        <div className="sketch-posts-public" key={post.id}>
          <h2 className="post-title">{post.data.title}</h2>
          <div className="post-text">{post.data.content}</div>
        </div>
      ) : (
        <div className="sketch-posts-user" key={post.id}>
          <h2 className="post-title">{post.data.title}</h2>
          <div className="post-text">{post.data.content}</div>
        </div>
      )}
    </>
  );
}

export default Posts;
