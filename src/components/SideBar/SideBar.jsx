import "./SideBar.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";


function Sidebar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />

        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <div className="sidebar__buttons-container">
        <button
          onClick={handleEditProfileClick}
          className="sidebar__edit-profile-btn"
        >
          Change Profile Data
        </button>
        <button onClick={handleSignOut} className="sidebar__logout-btn">
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;