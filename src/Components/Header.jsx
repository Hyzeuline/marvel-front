import logo from "../assets/img/marvel-logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ log, setLog }) => {
  return (
    <header className="container">
      <img src={logo} alt="logo-marvel" />
      <section className="menu">
        <div className="button-comics/characters">
          <Link to="/characters">
            <button>All characters</button>
          </Link>
          <Link to="/comics">
            <button> All comics</button>
          </Link>
        </div>
        <Link to="/favorites">
          <button className="favorites">Favorites ❤️ </button>
        </Link>
        {log ? (
          <button
            className="disconnect"
            onClick={() => {
              Cookies.remove("token");
              setLog(null);
            }}
          >
            Disconnect
          </button>
        ) : (
          <div className="button-signup/login">
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </section>
    </header>
  );
};
export default Header;
