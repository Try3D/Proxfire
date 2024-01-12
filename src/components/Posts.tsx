import { DocumentData } from "firebase/firestore";

interface Data {
  id: string;
  data: DocumentData;
}

function Posts(props: { post: Data }) {
  return (
    <>
      <div key={props.post.id}>
        <h2>{props.post.data.title}</h2>
        <pre>{props.post.data.content}</pre>
      </div>
    </>
  )
}

export default Posts;
