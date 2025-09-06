import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setLog }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let url = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/user/login`
    : "https://site--marvel-back--zvc5szvjvznr.code.run//user/login";

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      Cookies.set("token", response.data.token);
      setLog(response.data.token);
      navigate("/characters");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailChange = event => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = event => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div className="formulaire-login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input">
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
        <button className="login-form">Login</button>
        <Link to="/signup" className="lien-signup">
          <p>Don't have an account yet? Sign up!</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
