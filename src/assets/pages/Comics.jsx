import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Comics = ({ log }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comicTitle, setComicTitle] = useState("");
  const [page, setPage] = useState(1);

  const handleComicTitle = event => {
    setComicTitle(event.target.value);
    setPage(1);
  };
  const handleAddFavorite = async element => {
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
          withCredentials: true, // envoie le cookie HTTP-only
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
          ? `${import.meta.env.VITE_API_URL}/comics`
          : "https://site--marvel-back--zvc5szvjvznr.code.run/comics";
        let queries = [];
        if (comicTitle) {
          queries.push(`title=${encodeURIComponent(comicTitle)}`);
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
  }, [comicTitle, page]);

  return isLoading ? (
    <p className="loading">Loading ⏳</p>
  ) : (
    <div className="container">
      <div className="input-search">
        <input
          type="search"
          id="searchCharacter"
          placeholder="Search by title"
          value={comicTitle}
          onChange={handleComicTitle}
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
      <main className="container comics">
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
              <h2>{element.title}</h2>
              <div className="description">{element.description}</div>
              <div className="button-card">
                <Link to={`/comic/${element._id}`}>
                  <button>Comics details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Comics;
