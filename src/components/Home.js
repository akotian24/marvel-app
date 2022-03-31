import React from "react";
import marvelLogo from "../img/marvel.jpeg";
import "../App.css";

const Home = () => {
  return (
    <div>
      <header className="App-header">
        <h1 className="App-title">Welcome to MARVEL API</h1>
        <div className="marvelLogoHandler">
          <img
            className="marvelLogo"
            src={marvelLogo}
            alt="Marvel Studios"
          ></img>
        </div>
      </header>

      <div>
        <p className="homeDescriptopn">
          The Marvel Comics API allows developers everywhere to access
          information about Marvel's vast library of comics—from what's coming
          up, to 70 years ago.
        </p>
        <p className="hometext">
          The application queries three of Marvel's end-points: Characters,
          Comics, Series to get data about various marvel characters.
          <br></br> You can even search for a specific character, comic or
          series in the search Bar where the results will be querried for each
          input.
        </p>
      </div>
    </div>
  );
};

export default Home;
