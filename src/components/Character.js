import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import "../App.css";
import Error from "./Error";



const md5 = require("blueimp-md5");
const publickey = "cdac99504199ceccf717c0837e344e87";
const privatekey = "e6d38d5b8ae821da024f12b8ae284ae6d730f2b9";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

const Character = () => {
  let { id } = useParams();
  let Id = parseInt(id);

  const [hero, setHero] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [info,setInfo] = useState(true);
  //console.log(id);

  useEffect(() => {
    console.log("useEffect Fired from hero");
    const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
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
        // {` ${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}

        setHero(arrayHero[0]);
        setLoading(false);
        setInfo(false);
      } catch (e) {
        setInfo(true)
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
              alt= {`${hero.name}`}
              //className= "card-measurement"
              //style={{ width: "446px", height: "350px" }}
            />
            <Card.Body>
              <Card.Title>{hero && hero.name}</Card.Title>
              <Card.Text>
                <span className="main-point"> Description:</span>{" "}
                {hero.description ? hero.description : "No text available"}
              </Card.Text>
              <span className="main-point">Comics:</span>
              <ol className="charComicList">
                {hero.comics.items.map((item,idx) => {
                  return <li key={idx}>{item.name}</li>;
                })}
              </ol>
              <Link to='/characters/page/0'> Back to all characters</Link>
              
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
};

export default Character;
