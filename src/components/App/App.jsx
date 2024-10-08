import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import "../Header/Header.css";

import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import Register from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfile";
import Login from "../LoginModal/LoginModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { setToken, getToken, removeToken } from "../../utils/token";
import { getItems, deleteItem, addItem, likeCard, unlikeCard } from "../../utils/Api";
// import {
//   registerUser,
//   signinUser,
//   getUserByToken,
//   updateCurrentUser,
// } from "../../utils/auth";

import * as api from "../../utils/Api";
import * as auth from "../../utils/auth";


function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });

  const navigate = useNavigate();

  const handleRegistration = ({ name, avatar, email, password }) => {
    return auth
      .registerUser({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password });
        closeActiveModal();
      })
      .catch(console.error);
  };

  // const handleLogin = ({ email, password }) => {
  //   if (!email || !password) {
  //     return;
  //   }

  //   return auth
  //     .signinUser({ email, password })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.token) {
  //         setToken(data.token);
  //         auth.getUserByToken(data.token).then((userData) => {
  //           setCurrentUser(userData);
  //           setLoggedIn(true);
  //           localStorage.setItem("jwt", data.token)
  //           closeActiveModal();
  //           navigate("/profile");
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Login failed", err);
  //     });
  // };
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return auth
      .signinUser({ email, password })
      .then((data) => {
        console.log(data);
        if (data.token) {
          setToken(data.token);
          auth.getUserByToken(data.token).then((userData) => {
            setCurrentUser(userData);
            setLoggedIn(true);
            localStorage.setItem("jwt", data.token)
            closeActiveModal();
            navigate("/profile");
          });
        }
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    api
      .getUserByToken(jwt)
      .then(({ name, avatar, _id }) => {
        setLoggedIn(true);
        setCurrentUser({ name, avatar, _id });
        navigate("/profile");
      })
      .catch(console.error);
  }, [navigate]);

  const handleEditUser = (data) => {
    const jwt = getToken();
    return api
      .updateCurrentUser(data, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch(console.error);
  };



  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleSignOut = () => {
    removeToken();
    navigate("/*");
    setLoggedIn(false);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    console.log("Edit profile button clicked");
    setActiveModal("edit-profile");
  };


  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };


  const onAddItem = (item) => {
    const jwt = getToken();

    return addItem(item, jwt)
      .then((newItem) => {
        setClothingItems((clothingItems) => [newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    const jwt = getToken();
    deleteItem(id, jwt)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const navigateToLogin = () => {
    setActiveModal("login");
  };
  const navigateToSignUp = () => {
    setActiveModal("register");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log(data);
      })
      .catch(console.error);
  }, []);
  console.log(currentTemperatureUnit);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleCardLike = ({ id, isLiked }) => {
    const jwt = localStorage.getItem("jwt");

    !isLiked
      ? api
        .likeCard(id, jwt)
        .then((updatedCard) => {
          console.log(updatedCard);
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item)),
          );
        })
        .catch((err) => console.log(err))
      :
      api

        .removeCardLike(id, jwt)
        .then((updatedCard) => {
          console.log(updatedCard);
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item)),
          );
        })
        .catch((err) => console.log(err));
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              onClose={closeActiveModal}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>


            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteItem={handleDeleteItem}
            />
          )}

          {activeModal === "register" && (
            <Register
              onClose={closeActiveModal}
              isOpen={true}
              handleRegistration={handleRegistration}
              navigateToLogin={navigateToLogin}
            />
          )}

          {activeModal === "login" && (
            <Login
              onClose={closeActiveModal}
              isOpen={true}
              handleLogin={handleLogin}
              navigateToSignUp={navigateToSignUp}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={true}
              onClose={closeActiveModal}
              handleEditUser={handleEditUser}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
