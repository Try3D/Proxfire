import { db } from "../lib/firebase";
import { onSnapshot, collection, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import { latitude, longitude, haversineDistance } from "../lib/location";

interface Data {
  id: string;
  data: DocumentData;
}

function Right() {
  const [posts, setPosts] = useState<Data[]>([]);

  useEffect(() => {
    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const postData: Data[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      postData.sort((a: Data, b: Data) => b.data.time - a.data.time);

      setPosts(postData);
    });

    return unsubscribe;
  }, []);


  if (posts.length < 1) {
    return (
      <div className="sketch-posts-system">
        <h2 className="post-title">There are no posts near you</h2>
        <div className="post-text">
          Be the first to post something for others to see
        </div>
      </div>
    );
  } else {
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
  }
};

export default Right;
