import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";



function ClothesSection({ onCardClick, clothingItems, handleAddClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  console.log(clothingItems);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;