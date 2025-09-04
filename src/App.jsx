import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Characters from "./assets/pages/Characters";
import Comics from "./assets/pages/Comics";
import CharacterDetails from "./assets/pages/CharacterDetails";
import ComicsDetails from "./assets/pages/ComicsDetails";
import SpecificComics from "./assets/pages/SpecificComics";
import NoMatch from "./assets/pages/NoMatch";
import Favorites from "./assets/pages/Favorites";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/character/:characterId"
            element={<CharacterDetails />}
          />
          <Route path="/comics/:characterId" element={<SpecificComics />} />
          <Route path="/comic/:comicId" element={<ComicsDetails />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
