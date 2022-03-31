import Home from "./components/Home";
import Error from "./components/Error";
import Characters from "./components/Characters";
import Character from "./components/Character";
import Comics from "./components/Comics";
import Series from "./components/Series";
import ComicInfo from "./components/ComicInfo";
import SeriesInfo from "./components/SeriesInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Breadcrumb,Container } from "react-bootstrap";
function App() {
  return (
    
    <div className="App">
      <Container fluid>
 
      <Router>
        <Breadcrumb style={{margin: "20px"}}> 
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/characters/page/0">Characters</Breadcrumb.Item>
          <Breadcrumb.Item href="/comics/page/0">Comics</Breadcrumb.Item>
          <Breadcrumb.Item href="/series/page/0">Series</Breadcrumb.Item>
        </Breadcrumb>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters/page/:pgno" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/comics/page/:pgno" element={<Comics />} />
          <Route path="/comics/:id" element={<ComicInfo/>}/>
          <Route path="/series/page/:pgno" element={<Series />} />
          <Route path="/series/:id"  element={<SeriesInfo/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      </Container>
    </div>
  );
}

export default App;
