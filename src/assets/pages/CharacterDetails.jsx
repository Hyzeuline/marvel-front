import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CharacterDetails = () => {
  const { characterId } = useParams(); //id du character
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect lancé avec id =", characterId);
      try {
        let url = import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/character`
          : "https://site--marvel-back--zvc5szvjvznr.code.run/character/";
        const response = await axios.get(`${url}/${characterId}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <main className="container characterDetails">
      <div className="cardDetails">
        <img
          src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
          alt={`photo de ${data.name}`}
        />
        <h2>{data.name}</h2>
        <div className="descriptionFull">{data.description}</div>
      </div>
    </main>
  );
};

export default CharacterDetails;
