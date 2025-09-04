import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//Get all informations of specific comic

const ComicsDetails = () => {
  const { comicId } = useParams(); //id du comic
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect lancé avec id =", comicId);
      try {
        let url = import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/comic`
          : "https://site--marvel-back--zvc5szvjvznr.code.run/comic/";
        const response = await axios.get(`${url}/${comicId}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [comicId]);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <main className="container comicsDetails">
      <div className="cardDetails">
        <img
          src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
          alt={`photo de ${data.title}`}
        />
        <h2>{data.title}</h2>
        <div className="descriptionFull">{data.description}</div>
      </div>
    </main>
  );
};

export default ComicsDetails;
