import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import SearchMarvel from "./SearchMarvel";
import Error from "./Error";

const md5 = require("blueimp-md5");
const publickey = "cdac99504199ceccf717c0837e344e87";
const privatekey = "e6d38d5b8ae821da024f12b8ae284ae6d730f2b9";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";

const Characters = () => {
  let { pgno } = useParams();
  let pageNo = parseInt(pgno);
  //console.log(pageNo)
  //const [state, setState] = useState();
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  let card = null;

  //console.log(pgNo1)

  useEffect(() => {
    let getData = async () => {
      try {
        console.log("useEffect 1 fired");

        const url =
          baseUrl +
          "?offset=" +
          pageNo * 20 +
          "&ts=" +
          ts +
          "&apikey=" +
          publickey +
          "&hash=" +
          hash;
        let { data } = await axios.get(url);
        console.log(data.data);
        //let total = data.data.total;
        // let pages = 78;
        //let calculate = Math.ceil((parseInt(total) * pageNo) / pages);
        //setState(calculate);

        // setCharacter(data.data.results);
        //setLoading(false);
        //return data.data.results;

        setCharacter(data.data.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [pageNo]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        console.log(`in fetch searchTerm: ${searchTerm}`);
        const url =
          baseUrl +
          "?nameStartsWith=" +
          searchTerm +
          "&ts=" +
          ts +
          "&apikey=" +
          publickey +
          "&hash=" +
          hash;

          let {data} = await axios.get(url);
          setSearchData(data.data.results);
          setLoading(false);

      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log("searchTerm is set");
      fetchData();
    }
  },[searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  
  const buildCard = (character) => {
    return (
      <Col sm={3} key={character.id}>
        <div
          className="character_potrait"
          key={character.id}
          style={{ padding: "10px" }}
        >
          {/* {JSON.stringify(character)} */}

          <Link to={`/characters/${character.id}`}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
                alt={`${character.name}`}
              />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </Col>
    );
  };


  if(searchTerm){
    card = searchData && searchData.map((characters)=>{
        return buildCard(characters);
     });
  }else{
      card = character && character.map((characters)=>{
       return buildCard(characters);
      });
  }

  if (pageNo>77 || pageNo<0 ||isNaN(pageNo)) {
    return <Error/>
  }else if(loading ){
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="charcterGroup">
        
        <Container>
          <div className="titleText">
            <h1>Marvel Charaters</h1>
          </div>
          <SearchMarvel searchValue={searchValue}/>
          <div className="charButton">
            <span className="charPrevious">
              {/* {pageNo === 0 ?  <Button disable>Previous</Button>: <Button href={`/characters/page/${pageNo - 1}`}>Previous</Button>} */}
              <Button
                className={pageNo === 0 ? "disable" : "active"}
                href={`/characters/page/${pageNo - 1}`}
              >
                Previous
              </Button>
            </span>
            <span className="charNext">
              <Button
                className={pageNo >= 77 ? "disable" : "active"}
                href={`/characters/page/${pageNo + 1}`}
              >
                Next
              </Button>
            </span>
          </div>

          <Row>

            {card}
          </Row>
        </Container>
      </div>
    );
  }
};

export default Characters;
