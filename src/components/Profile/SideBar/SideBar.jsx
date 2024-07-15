import "./SideBar.css";
import avatar from "../../../images/avatar.png";


function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="default avatar" className="sidebar__avatar" />
      <p className="sidebar__username">username</p>
    </div>
  );
}

export default Sidebar;