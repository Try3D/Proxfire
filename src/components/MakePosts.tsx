import { useState, ChangeEvent, FormEvent } from "react";
import { db } from "../lib/firebase.ts";
import { doc, setDoc } from "firebase/firestore";
import { latitude, longitude } from "../lib/location.ts";
import { append } from "../lib/localStorage.ts";
import "./MakePosts.css";

function MakePosts() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setPostTitle(event.target.value);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setPostContent(event.target.value);
  }

  function submit() {
    const date = new Date();
    const id = crypto.randomUUID();

    append(id);

    setDoc(doc(db, "posts", id), {
      time: date.getTime(),
      title: postTitle,
      content: postContent,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    });

    setPostTitle("");
    setPostContent("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="textbox"
          value={postTitle}
          onChange={handleTitleChange}
          placeholder="Title: "
        />
        <textarea
          className="textarea"
          value={postContent}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
        />
        <button className="button">POST</button>
      </form>
    </>
  );
}

export default MakePosts;
