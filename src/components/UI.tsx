import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { db } from "../lib/firebase.ts";
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  DocumentData,
} from "firebase/firestore";
import { latitude, longitude, haversineDistance } from "../lib/location.ts";
import { append } from "../lib/localStorage.ts";
import "./UI.css";
import { get, remove } from "../lib/localStorage.ts";

interface Data {
  id: string;
  data: DocumentData;
}

interface PropPopup {
  title: string;
  content: string;
  style: string;
}

function UI() {
  const [updateId, setUpdateId] = useState("");
  const [inUpdate, setInUpdate] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function startUpdate(id: string, title: string, content: string) {
    setUpdateId(id);
    setTitle(title);
    setContent(content);

    setInUpdate(true);
  }

  function Post() {
    const [postTitle, setPostTitle] = useState(title);
    const [postContent, setPostContent] = useState(content);

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
      setPostTitle(event.target.value);
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
      setPostContent(event.target.value);
    }

    function stopUpdate(id: string, title: string, content: string) {
      setDoc(
        doc(db, "posts", id),
        {
          title: title,
          content: content,
        },
        { merge: true },
      );

      setTitle("");
      setContent("");

      setInUpdate(false);
    }

    function submit(e: FormEvent) {
      e.preventDefault();

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

    return (
      <>
        <form
          onSubmit={
            inUpdate
              ? () => {
                  stopUpdate(updateId, postTitle, postContent);
                }
              : submit
          }
        >
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
          <button className="button">
            {inUpdate ? <>UPDATE POST</> : <>POST</>}
          </button>
        </form>
      </>
    );
  }

  function Feed() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<Data[]>([]);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        closeModal();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, []);

    useEffect(() => {
      const postsCollection = collection(db, "posts");

      return onSnapshot(postsCollection, (querySnapshot) => {
        const postData: Data[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setPosts(postData);
      });
    }, []);

    const postList = posts
      .filter(
        (post) =>
          haversineDistance(
            latitude,
            longitude,
            post.data.location.latitude,
            post.data.location.longitude,
          ) < 10,
      )
      .sort((a, b) => b.data.time - a.data.time);

    if (postList.length === 0) {
      return (
        <>
          {isModalOpen && (
            <div className="popup" ref={modalRef}>
              <div className="popup-content">
                <div className="sketch-posts-system">
                  <h2 className="post-title">There are no posts near you</h2>
                  <div className="post-text">
                    Be the first to post something for others to see
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="sketch-posts-system"
            onClick={openModal}
            ref={modalRef}
          >
            <h2 className="post-title">There are no posts near you</h2>
            <div className="post-text">
              Be the first to post something for others to see
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {postList.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </>
    );
  }

  function Posts({ post: { id, data } }: { post: Data }) {
    const { title, content } = data;

    function Popup({ title, content, style }: PropPopup) {
      return (
        <div className="popup" ref={modalRef}>
          <div className="popup-content">
            <div className={style}>
              <h2 className="post-title">{title}</h2>
              <div className="post-text">{content}</div>
            </div>
          </div>
        </div>
      );
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        closeModal();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, []);

    const myPosts = get();

    async function deletePost(id: string) {
      await deleteDoc(doc(db, "posts", id));
      remove(id);
    }

    if (myPosts.indexOf(id) === -1) {
      return (
        <>
          {isModalOpen && (
            <Popup
              title={title}
              content={content}
              style="sketch-posts-public"
            />
          )}
          <div
            className="sketch-posts-public"
            key={id}
            ref={modalRef}
            onClick={openModal}
          >
            <h2 className="post-title">{title}</h2>
            <div className="post-text">{content}</div>
          </div>
        </>
      );
    }

    return (
      <>
        {isModalOpen && (
          <Popup
            title={title}
            content={data.content}
            style="sketch-posts-user"
          />
        )}
        <div
          className="sketch-posts-user"
          key={id}
          ref={modalRef}
          onClick={openModal}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              deletePost(id);
            }}
            className="buttons"
          >
            <img src="/icons/close.svg" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              startUpdate(id, title, content);
            }}
            className="buttons"
          >
            <img src="/icons/edit.svg" />
          </button>
          <h2 className="post-title">{title}</h2>
          <div className="post-text">{content}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="left-item">
          <Post />
        </div>
        <div className="right-item">
          <Feed />
        </div>
      </div>
    </>
  );
}

export default UI;
