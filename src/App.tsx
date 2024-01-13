import Feed from "./components/Feed.tsx";
import Posts from "./components/Posts.tsx";
import Navbar from "./components/Navbar.tsx";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container">
        <div className="left-item">
          <Posts />
        </div>
        <div className="right-item">
          <Feed />
        </div>
      </div>
    </>
  );
}

export default App;
