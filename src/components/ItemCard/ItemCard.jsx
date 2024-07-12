import "../ItemCard/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card-container">
      <h2 className="card__title"> {item.name} </h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      ></img>
    </li>
  );
}

export default ItemCard;
