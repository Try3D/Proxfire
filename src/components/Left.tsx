import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../lib/firebase.ts";
import { latitude, longitude } from "../lib/location.ts";
import { append } from "../lib/localStorage.ts";

import "./Left.css";

function Left() {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const submit = (e: React.FormEvent) => {
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
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <form onSubmit={submit}>
        <input
          type="textbox"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title: "
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
        />
        <button>POST</button>
      </form>
    </>
  );
}

export default Left;
