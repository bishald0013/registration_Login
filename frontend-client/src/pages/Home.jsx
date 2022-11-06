import React from "react";
import { Link } from "react-router-dom";
import image from "../images/image 1.png"

function Home() {
  return (
    <div className="container main_container">
      <div className="heading_container mt-5 pt-5">
        <img src={image} className="img-fluid"></img>  
      </div>
    </div>
  );
}

export default Home;
