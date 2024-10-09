// import headerAvatar from "../../images/avatar.png";
import headerLogo from "../../images/header-Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";


function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleSignUpClick
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);


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
          // className="header__add-clothes-button"
          className={`header__add-clothes-button ${!isLoggedIn ? "header__add_button_hidden" : ""}`}
        >
          + ADD CLOTHES
        </button>
        {isLoggedIn ? (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__user-name"> {currentUser?.name}</p>
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="header__avatar"
            />
          </div>
        </Link>
        ) : (
        <div className="header__auth">
          <button className="header__register" onClick={handleSignUpClick}>
            Sign Up
          </button>
          <button className="header__login" onClick={handleLoginClick}>
            Login
          </button>
        </div>
        )}
      </div>
    </header>
  );
}

export default Header;
