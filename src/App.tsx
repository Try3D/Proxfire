import "./App.css";
import Left from "./components/Left.tsx";
import Right from "./components/Right.tsx";

function App() {
  return (
    <>
      <div>
        <a href="/">
          <h1>Proxfire</h1>
        </a>
      </div>
      <div className="container">
        <div className="left-item">
          <Left />
        </div>
        <div className="right-item">
          <Right />
        </div>
      </div>
    </>
  );
}

export default App;
