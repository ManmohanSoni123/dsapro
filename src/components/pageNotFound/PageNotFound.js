import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div clasName="body">
      <div className="mainbox">
        <div className="err">4</div>
        <i className="far fa-question-circle fa-spin"></i>
        <div className="err2">4</div>
        <div className="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go <Link to="/">home</Link> and try from there.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
