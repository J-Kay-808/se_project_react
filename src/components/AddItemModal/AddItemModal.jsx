import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [data, setData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(data);
  }

  useEffect(() => {
    if (isOpen) {
      setData({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen]);

  const isFormValid = () => {
    return data.name && data.imageUrl && data.weather ;
  };



  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          id="name"
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          placeholder="Image Url"
          value={data.imageUrl}
          name="imageUrl"
          onChange={handleChange}
          id="imageUrl"
          type="url"
          className="modal__input"
          minLength="1"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          {" "}
          <input
            name="weather"
            id="hot"
            value="hot"
            type="radio"
            onChange={handleChange}
            className="modal__radio-input"
            checked={data.weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            value="warm"
            type="radio"
            className="modal__radio-input"
            checked={data.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            name="weather"
            value="cold"
            id="cold"
            type="radio"
            className="modal__radio-input"
            checked={data.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
        <button
          type="submit"
          className={`register__link ${isFormValid() ? "active" : ""}`}
        >
          Add garment
        </button>
      </fieldset>{" "}
    </ModalWithForm>
  );
};

export default AddItemModal;