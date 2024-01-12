import { useState, useEffect } from "react";
import "./Loader.css";

function Loader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    // Cleanup function to clear the timeout in case the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      {showLoader ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="sketch-posts-system">
          <h2 className="post-title">There are no posts near you</h2>
          <div className="post-text">
            Be the first to post something for others to see
          </div>
        </div>
      )}
    </>
  );
}

export default Loader;
