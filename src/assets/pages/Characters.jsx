import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Characters = ({ log }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [characterName, setCharacterName] = useState("");
  const [page, setPage] = useState(1);

  const handleCharacterName = event => {
    setCharacterName(event.target.value);
    setPage(1);
  };

  const handleAddFavorite = async element => {
    if (!log) {
      // vérifier si je suis connecter pour pouvoir ajouter des favoris
      alert("You need to be connected for add a favorite !");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/favorite`,
        {
          title: element.name,
          description: element.description,
          itemType: "character",
          itemId: element._id,
          image: {
            url: `${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`,
          },
        },
        {
          withCredentials: true, // pour envoyer le cookie
        }
      );

      console.log("Favori ajouté :", response.data);
      alert(`${element.name} a été ajouté à vos favoris ❤️`);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Impossible d'ajouter ce favori. Vérifiez que vous êtes connecté."
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/characters`
          : "https://site--marvel-back--zvc5szvjvznr.code.run/characters";
        let queries = [];
        if (characterName) {
          queries.push(`name=${encodeURIComponent(characterName)}`);
        }
        if (page) {
          queries.push(`page=${page}`);
        }

        if (queries.length > 0) {
          url += "?" + queries.join("&");
        }

        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [characterName, page]);

  return isLoading ? (
    <p className="loading">Loading ⏳</p>
  ) : (
    <div className="container">
      <div className="input-search">
        <input
          type="search"
          id="searchCharacter"
          placeholder="Search by name"
          value={characterName}
          onChange={handleCharacterName}
        />
      </div>
      <div className="pagination">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ←
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(prev => prev + 1)}>→</button>
      </div>
      <main className="container characters">
        {data.results.map((element, index) => {
          return (
            <div key={index} className="card">
              <div className="favorite">
                <div
                  onClick={() => handleAddFavorite(element)}
                  className={`heart-button ${log ? "active" : "disabled"}`}
                >
                  ♥️
                </div>
              </div>
              <img
                src={`${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`}
                alt={`photo de ${element.name}`}
              />
              <h2>{element.name}</h2>
              <div className="description">{element.description}</div>
              <div className="button-card">
                <Link to={`/comics/${element._id}`}>
                  <button>Comics with</button>
                </Link>
                <Link to={`/character/${element._id}`}>
                  <button>See more</button>
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Characters;

// const [log, setLog] = useState();

//     création de chaque cookie pour chaque value
//     Cookies.set("characterId", {data.results.map((element)=>{
// return element._id}), { expires: 14 });
//     récupération du cookies et mise à jour de la valeur log
//     setLog(Cookies.get("characterId"));

// onClick={()=>{
//                      Cookies.set("characterId", { element._id}), { expires: 14 });
//                      setLog(Cookies.get("characterId"));
//                 }}
