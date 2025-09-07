import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Characters from "./assets/pages/Characters";
import Comics from "./assets/pages/Comics";
import CharacterDetails from "./assets/pages/CharacterDetails";
import ComicsDetails from "./assets/pages/ComicsDetails";
import SpecificComics from "./assets/pages/SpecificComics";
import NoMatch from "./assets/pages/NoMatch";
import Favorites from "./assets/pages/Favorites";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [log, setLog] = useState(null || Cookies.get("token"));

  return (
    <>
      <Router>
        <Header log={log} setLog={setLog} />
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<Characters log={log} />} />
          <Route path="/comics" element={<Comics log={log} />} />
          <Route
            path="/signup"
            element={<Signup log={log} setLog={setLog} />}
          />
          <Route path="/login" element={<Login log={log} />} />
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
