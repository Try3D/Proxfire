import { useState, ChangeEvent, FormEvent } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase.ts";
import { latitude, longitude } from "../lib/location.ts";
import { append } from "../lib/localStorage.ts";

import "./Posts.css";

function Left() {
  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function submit(e: FormEvent) {
    e.preventDefault();

    const date = new Date();
    const id = crypto.randomUUID();

    append(id);

    setDoc(doc(db, "posts", id), {
      time: date.getTime(),
      title: title,
      content: content,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    });

    setTitle("");
    setContent("");
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <form onSubmit={submit}>
        <input
          className="input"
          type="textbox"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title: "
        />
        <textarea
          className="textarea"
          value={content}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
        />
        <button className="button">POST</button>
      </form>
    </>
  );
}

export default Left;
