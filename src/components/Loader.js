import React from "react";
import { CircularProgress } from "@material-ui/core";
import "../assets/css/Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <span className="loader__loading">
        <CircularProgress style={{ color: "var(--userMessageColor)" }} />
        <p className="loader__loadingtext">
          Loading
          <span class="dot-typing"></span>
        </p>
      </span>
    </div>
  );
};

export default Loader;
