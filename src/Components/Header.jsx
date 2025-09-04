import logo from "../assets/img/marvel-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container">
      <img src={logo} alt="logo-marvel" />
      <section className="menu">
        <div>
          <Link to="/characters">
            <button>All characters</button>
          </Link>
          <Link to="/comics">
            <button> All comics</button>
          </Link>
        </div>
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
      </section>
    </header>
  );
};
export default Header;
