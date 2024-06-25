import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import "../Header/Header.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import WeatherCard from "../WeatherCard/WeatherCard";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("preview");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garnment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => { 
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData)
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garnment"
        buttonText="Add Garnment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            id="imageUrl"
            className="modal__input"
            placeholder="ImageURL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select The Weather Type</legend>
        </fieldset>
        <label htmlFor="hot" className="modal__label modal__input_type-radio">
          <input id="hot" type="radio" className="modal__radio-input" />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__input_type-radio">
          <input id="warm" type="radio" className="modal__radio-input" />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__input_type-radio">
          <input id="cold" type="radio" className="modal__radio-input" />
          Cold
        </label>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
