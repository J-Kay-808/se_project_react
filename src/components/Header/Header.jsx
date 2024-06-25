import headerAvatar from "../../images/Ellipse18.png";
import headerLogo from "../../images/Logo.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="" />
      <p className="header__date-and-location"> DATE.LOCATION</p>
      <button className="header__add-clothes-button">+ ADD CLOTHES</button>
      <div className="header__user-container">
        <p className="header__username"> USERNAME</p>
        <img src={headerAvatar} alt="Avatar Logo" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
