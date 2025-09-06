import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

//"Get a list of comics containing a specific character"

const SpecificComics = () => {
  const { characterId } = useParams(); //id du character
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect lancé avec id =", characterId);
      try {
        let url = import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/comics`
          : "https://site--marvel-back--zvc5szvjvznr.code.run/comics/";
        const response = await axios.get(`${url}/${characterId}`);
        console.log(response.data);
        // {thumbnail: {…}, comics: Array(12), _id: '5fcf91f4d8a2480017b91453', name: '3-D Man', description: '', …}
        // comics: Array(12)
        // 0: {thumbnail: {…}, _id: '5fce213378edeb0017c9602f', title: 'Avengers: The Initiative (2007) #14', description: "The fates of The Initiative, the United States, an…l of Earth's greatest Skrull-Hunter, The 3-D Man.", __v: 0}
        // 1: {thumbnail: {…}, _id: '5fce213478edeb0017c96040', title: 'Avengers: The Initiative (2007) #14 (SPOTLIGHT VARIANT)', description: null, __v: 0}
        // 2:{thumbnail: {…}, _id: '5fce20fe78edeb0017c95fb7', title: 'Avengers: The Initiative (2007) #15', description: "It's up to the Initiative to face off against the …low for Ant-Man and a new danger for War Machine!", __v: 0}
        // 3: {thumbnail: {…}, _id: '5fce20e078edeb0017c95f01', title: 'Avengers: The Initiative (2007) #16', description: "The Skrull Kill Krew is back! And they're ready to… Hammond, Ant-Man is in a giant world of trouble.", __v: 0}
        // 4:{thumbnail: {…}, _id: '5fce20ab78edeb0017c95e56', title: 'Avengers: The Initiative (2007) #17', description: "Join Mutant Zero, Trauma, Bengal, Constrictor, and…nger and more clues as to Mutant Zero's identity!", __v: 0}
        // 5: {thumbnail: {…}, _id: '5fce207678edeb0017c95d8b', title: 'Avengers: The Initiative (2007) #18', description: "Now that the Kill Krew knows Skrullowjacket's mast… than she appears to be and the other's a Skrull!", __v: 0}
        // 6: {thumbnail: {…}, _id: '5fce207678edeb0017c95d8c', title: 'Avengers: The Initiative (2007) #18 (ZOMBIE VARIANT)', description: 'SECRET INVASION TIE-IN!\r<br>THE EXPLOSIVE FINALE S…o unmask MUTANT ZERO?!\r<br>Rated T+ ...$2.99\r<br>', __v: 0}
        // 7: {thumbnail: {…}, _id: '5fce202078edeb0017c95c8e', title: 'Avengers: The Initiative (2007) #19', description: 'Join 3-D MAN, CLOUD 9, KOMODO, HARDBALL, and heroe…ive program. Will the Kill Krew Army win the day?', __v: 0}
        // 8: {thumbnail: {…}, _id: '5fce292678edeb0017c97e05', title: 'Deadpool (1997) #44', description: null, __v: 0}
        // 9: {thumbnail: {…}, _id: '5fce31ee78edeb0017c9a305', title: 'Marvel Premiere (1972) #35', description: null, __v: 0}
        // 10: {thumbnail: {…}, _id: '5fce31dc78edeb0017c9a2b0', title: 'Marvel Premiere (1972) #36', description: null, __v: 0}
        // 11: {thumbnail: {…}, _id: '5fce31c778edeb0017c9a276', title: 'Marvel Premiere (1972) #37', description: null, __v: 0}
        // length: 12
        // [[Prototype] : Array(0)
        // description: ""
        // name: "3-D Man"
        // thumbnail: {path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784', extension: 'jpg'}
        // __v: 0
        // _id:"5fcf91f4d8a2480017b91453"
        // [[Prototype]]
        // Object
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erreur Axios :", error);
      }
    };

    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p className="loading">Loading ⏳</p>
  ) : (
    <main className="container specificComics">
      {data.comics.map((element, index) => {
        return (
          <div key={index} className="card">
            <img
              src={`${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`}
              alt={`photo de ${element.name}`}
            />
            <h2>{element.title}</h2>
            <div className="description">{element.description}</div>
            <Link to={`/comic/${element._id}`}>
              <button className="button-card">See more</button>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default SpecificComics;
