import { db } from "../lib/firebase";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import './Right.css';
import { latitude, longitude, haversineDistance } from "../lib/location";

interface Data {
  id: string;
  data: DocumentData;
}

const Right = () => {
  const [posts, setPosts] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));

        const postData: Data[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        // Sort the posts by time inside the useEffect
        postData.sort((a: Data, b: Data) => b.data.time - a.data.time);

        setPosts(postData);
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchData();

  }, [latitude, longitude]);

  return (
    <>
      {posts.map((post) => (
            haversineDistance(latitude, longitude, post.data.location.latitude, post.data.location.longitude) < 10 ? <Posts key={post.id} post={post} /> : <h1 key={post.id}>hi</h1>
      ))}
    </>
  );
};

export default Right;
