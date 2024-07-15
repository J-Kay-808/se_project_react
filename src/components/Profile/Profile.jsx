import "./Profile.css";
import ClothesSection from "./ClothesSection/ClothesSection";
import SideBar from "./SideBar/SideBar";

function Profile({ onCardClick, clothingItems, handleAddClick }) {
    return (
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
        </section>
        <section className="profile__clothing-items">
          <ClothesSection
            clothingItems={clothingItems}
            onCardClick={onCardClick}
            handleAddClick={handleAddClick}
          />
        </section>
      </div>
    );
  }
  
  export default Profile;