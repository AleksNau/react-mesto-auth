import React, {useEffect, useState} from "react";
import "../index.css";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import api from "../utils/Api";
import AddCardPopup from "./AddCardPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import SubmitPopup from "./SubmitPopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingText from "../contexts/loadingContext";

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  //обработчики попапов
  const [isPopupAvatar, setPopupAvatar] = useState(false);
  const [isEditProfilePopupOpen, setPopupProfile] = useState(false);
  const [isAddPlacePopupOpen, setPopupAdd] = useState(false);
  const [isSubmitPopupOpen, setPopupSubmit] = useState(false);

  const [cardToDelete, setCardToDelete] = useState({});
  //установить карточку
  const [selectedCard, handleCardClick] = useState({});
  //обработчик загрузки
  const [isLoading, setIsLoading] = useState(false);

  function closeAllPopups() {
    setPopupAvatar(false);
    setPopupProfile(false);
    setPopupAdd(false);
    setPopupSubmit(false);
    handleCardClick({});
  }

  const isOpen = isPopupAvatar || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error);
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error);
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setName(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .sendAvatar(data.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .newCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then(([info, cards]) => {
        setCurrentUser(info);
        setCards(cards);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="root">
      <LoadingText.Provider value={isLoading}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header />
            <Main
              cards={cards}
              isPopupSubmit={isSubmitPopupOpen}
              handleEditAvatarClick={setPopupAvatar}
              handleEditProfileClick={setPopupProfile}
              onSubmitDelete={setPopupSubmit}
              handleAddPlaceClick={setPopupAdd}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              setCardToDelete={setCardToDelete}
            />
            <Footer />
          </div>

          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            name={"add"}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            popupName={"profile"}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isPopupAvatar}
            name={"avatar"}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <SubmitPopup
            isOpen={isSubmitPopupOpen}
            name={"remove"}
            onClose={closeAllPopups}
            onDelete={handleCardDelete}
            cardToDelete={cardToDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </LoadingText.Provider>
    </div>
  );
};

export default App;
