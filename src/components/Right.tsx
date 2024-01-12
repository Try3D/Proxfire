import { db } from "../lib/firebase";
import { onSnapshot, collection, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import Loader from "./Loader";
import "./Right.css";
import { latitude, longitude, haversineDistance } from "../lib/location";

interface Data {
  id: string;
  data: DocumentData;
}

const Right = () => {
  const [posts, setPosts] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const postData: Data[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      postData.sort((a: Data, b: Data) => b.data.time - a.data.time);

      setPosts(postData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {posts.map((post) =>
        haversineDistance(
          latitude,
          longitude,
          post.data.location.latitude,
          post.data.location.longitude,
        ) < 10 ? (
          <Posts key={post.id} post={post} />
        ) : null,
      )}
    </>
  );
};

export default Right;
