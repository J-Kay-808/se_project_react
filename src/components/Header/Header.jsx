import headerAvatar from "../../images/avatar.png";
import headerLogo from "../../images/header-Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <Link to="/">
          <img className="header__logo" src={headerLogo} alt="Header Logo" />
        </Link>
        <p className="header__date-and-location">
          {" "}
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__temp-and-user">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + ADD CLOTHES
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <span className="header__username"> Terrence Tegegne</span>
            <img
              src={headerAvatar}
              alt="Avatar Logo"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
