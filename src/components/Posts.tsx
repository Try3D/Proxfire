import { db } from "../lib/firebase.ts";
import { get, remove } from "../lib/localStorage.ts";
import { doc, deleteDoc, DocumentData } from "firebase/firestore";
import "./Posts.css";

interface Data {
  id: string;
  data: DocumentData;
}

function Posts({ post }: { post: Data }) {
  const myPosts = get();

  async function deletePost(id: string) {
    await deleteDoc(doc(db, "posts", id));
    remove(id);
  }

  return (
    <>
      {myPosts.indexOf(post.id) === -1 ? (
        <div className="sketch-posts-public" key={post.id}>
          <h2 className="post-title">{post.data.title}</h2>
          <div className="post-text">{post.data.content}</div>
        </div>
      ) : (
        <div className="sketch-posts-user" key={post.id}>
          <button
            onClick={() => {
              deletePost(post.id);
            }}
            className="buttons"
          >
            <img src="/icons/close.svg" />
          </button>
          <h2 className="post-title">{post.data.title}</h2>
          <div className="post-text">{post.data.content}</div>
        </div>
      )}
    </>
  );
}

export default Posts;
