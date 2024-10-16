import "../Main/Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, onCardClick, clothingItems,onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;

  const handleDeleteCard = (id) => {
    console.log(`Delete card with id: ${id}`);
  };

  return (
    <main className="main">
      {" "}
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          {" "}
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? `${weatherData.temp.F}°F`
            : `${weatherData.temp.C}°C`}{" "}
          / You may want to wear:{" "}
        </p>
        <ul className="cards__list">
          {clothingItems &&
            clothingItems
              .filter((item) => item.weather === weatherData?.type)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
                    handleDeleteItem={handleDeleteCard}
                    onCardLike={onCardLike}
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
