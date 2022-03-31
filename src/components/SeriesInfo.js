import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import Error from "./Error";

const md5 = require("blueimp-md5");
const publickey = "cdac99504199ceccf717c0837e344e87";
const privatekey = "e6d38d5b8ae821da024f12b8ae284ae6d730f2b9";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

const SeriesInfo = () => {
  let { id } = useParams();
  let Id = parseInt(id);
  console.log(id);

  const [hero, setHero] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [info,setInfo] = useState(true);

  useEffect(() => {
    console.log("useEffect Fired from hero");
    const baseUrl = "https://gateway.marvel.com:443/v1/public/series";
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
              
              <span className="main-point"> Writers:</span>{" "}
                <ol className="creators List">
                  {hero.creators.items.map((item,idx) => {
                    return (
                      <li key={idx}>
                        {item.name}, {`[${item.role}]`}{" "}
                      </li>
                    );
                  })}
                </ol>
              <span className="main-point">Start Year: </span>
              {hero.startYear ? hero.startYear : "N/A"}
              <br></br>
              <span className="main-point">End Year: </span>
              {hero.endYear ? hero.endYear : "N/A"}
              <br></br>
              <span className="main-point">Type: </span>
              {hero.type ? hero.type : " Not available"}
              <br></br>
              <span className="main-point">Rating: </span>
              {hero.rating ? hero.rating : " Book format not available"}
              {/* <ol className="charComicList">
                {hero.comics.items.map((item) => {
                  return <li key={item.name}>{item.name}</li>;
                })}
              </ol> */}
              <div>
                <Link to="/series/page/0"> Back to all series</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
};

export default SeriesInfo;
