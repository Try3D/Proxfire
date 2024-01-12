import Left from "./components/Left.tsx";
import Right from "./components/Right.tsx";
import Header from "./components/Header.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Header />
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
