import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import Error from "./Error";
import "../App.css";

const md5 = require("blueimp-md5");
const publickey = "cdac99504199ceccf717c0837e344e87";
const privatekey = "e6d38d5b8ae821da024f12b8ae284ae6d730f2b9";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

const ComicInfo = () => {
  let { id } = useParams();
  let Id = parseInt(id);
  console.log(id);

  const [hero, setHero] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [info,setInfo] = useState(true);

  useEffect(() => {
    console.log("useEffect Fired from hero");
    const baseUrl = "https://gateway.marvel.com:443/v1/public/comics";
    const url =
      baseUrl +
      "/" +
      Id +
      "?ts=" +
      ts +
      "&apikey=" +
      publickey +
      "&hash=" +
      hash;

    async function getHero() {
      try {
        const { data } = await axios.get(url);

        let arrayHero = data.data.results;
        console.log(arrayHero[0]);

        setHero(arrayHero[0]);
        setLoading(false);
        setInfo(false)
      } catch (e) {
        setInfo(true);
        console.log(e);
      }
    }
    getHero();
  }, [Id]);

  
if(info){
  return <Error/>

}else if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <Container className="container1">
        <div className="Hero">
          <Card style={{ width: "28rem" }}>
            <Card.Img
              variant="top"
              src={` ${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
              alt={`${hero.title}`}
              //className= "card-measurement"
            />
            <Card.Body>
              <Card.Title className="heroTitle">
                {hero && hero.title}
              </Card.Title>
              <Card.Text>
                <span className="main-point"> Summary:</span>{" "}
                {hero.textObjects
                  ? hero.textObjects.map((item,idx) => {
                      return <span key={idx}>{item.text}</span>;
                    })
                  : "No Summary Available"}
              </Card.Text>
              <span className="main-point">Issue Number: </span>
              {hero.issueNumber ? hero.issueNumber : "N/A"}
              <br></br>
              <span className="main-point">Page Count: </span>
              {hero.pageCount ? hero.pageCount : " Page Count Unavailable "}
              <br></br>
              <span className="main-point">ISBN Number: </span>
              {hero.isbn ? hero.isbn : " ISBN number Unavaialable"}
              <br></br>
              <span className="main-point">Format: </span>
              {hero.format? hero.format: " Book format not available"}
        
              <div>
                <Link to="/comics/page/0"> Back to all comics</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
};

export default ComicInfo;
