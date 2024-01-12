import { db } from "../lib/firebase";
import { getDocs, collection, DocumentData } from "firebase/firestore";

import { useState, useEffect } from "react";

import './Right.css';

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
        setPosts(postData);
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.id}</h2>
          <pre>{JSON.stringify(post.data, null, 2)}</pre>
        </div>
      ))}
    </>
  );
};

export default Right;
