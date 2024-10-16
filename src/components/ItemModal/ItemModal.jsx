import "./ItemModal.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";


function ItemModal({
  activeModal,
  onClose,
  card,
  handleDeleteItem
}) {

  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    handleDeleteItem(card._id);
    onClose();
  };

  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-btn_visible" : "modal__delete-btn_hidden"
  }`;



  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={handleDeleteClick}
          >
            {" "}
            Delete card
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
