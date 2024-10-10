import "./Profile.css";
import ClothesSection from "./ClothesSection/ClothesSection";
import SideBar from "./SideBar/SideBar";

function Profile({
  handleEditProfileClick,
  handleSignOut,
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  weatherData
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleSignOut={handleSignOut}
        />

      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;