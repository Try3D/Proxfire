import Navbar from "./components/Navbar.tsx";
import MakePosts from "./components/MakePosts.tsx";
import Feed from "./components/Feed.tsx";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <div className="left-item">
          <MakePosts />
        </div>
        <div className="right-item">
          <Feed />
        </div>
      </main>
    </>
  );
}

export default App;
