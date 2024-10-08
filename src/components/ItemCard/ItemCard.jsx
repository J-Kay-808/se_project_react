import "../ItemCard/ItemCard.css";
import { useContext } from "react";
import likeButton from "../../images/like-Button.svg";
import likeButtonActive from "../../images/like-button_active.svg";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = !!currentUser._id;

  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;
  console.log(isLiked);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };  
  
  return (
    <li className="card">
    <div className="card__info">
      <h2 className="card__name">{item.name}</h2>
      <img className={itemLikeButtonClassName} onClick={handleLike} src={isLiked ? likeButton : likeButtonActive} />    </div>
    <img
      onClick={handleCardClick}
      className="card__image"
      src={item.imageUrl}
      alt={item.name}
    />
  </li>
);
}


export default ItemCard;
