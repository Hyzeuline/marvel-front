import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ setLog }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = event => {
    const value = event.target.value;
    setUserName(value);
  };

  const handleEmailChange = event => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = event => {
    const value = event.target.value;
    setPassword(value);
  };

  let url = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/user/signup`
    : "https://site--marvel-back--zvc5szvjvznr.code.run//user/signup";

  const handleSubmit = async event => {
    event.preventDefault(); // ça permet à la page de ne pas être rafraîchit
    try {
      //il faut récupérer les données des states pour les envoyées au serveur
      const response = await axios.post(url, {
        username,
        email,
        password,
      });
      console.log(response.data);

      //création de chaque cookie pour chaque value
      Cookies.set("token", response.data.token, { expires: 14 });
      Cookies.set("username", response.data.account.username, { expires: 14 });
      //récupération du cookies et mise à jour de la valeur log
      setLog(Cookies.get("token"));
      //rediriger nos utilisateurs vers home
      navigate("/characters");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formulaire-signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            placeholder="Username"
            type="text"
            name="name"
            value={username}
            onChange={handleNameChange}
          />
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <p>
          By registering, I confirm that I have read and accepted Marvel's Terms
          & Conditions and Privacy Policy. I confirm that I am at least 18 years
          old.
        </p>
        <button className="signup-form">Sign up</button>
        <Link to="/login" className="lien-login">
          <p>Already an account ? Login !</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
