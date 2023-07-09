import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

const Main = ({
  cards,
  isPopupSubmit,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  onSubmitDelete,
  onCardClick,
  onCardLike,
  onCardDelete,
  setCardToDelete,
}) => {
  const user = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info-conteiner">
          <img src={user.avatar} alt="Жак Кусто" className="profile__avatar" />
          <button
            className="profile__avatar-button"
            onClick={() => {
              handleEditAvatarClick(true);
            }}
          >
            <a href="#" className="profile__avatar-icon" />
          </button>
          <h1 className="profile__name">{user.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={() => {
              handleEditProfileClick(true);
            }}
          />
          <p className="profile__info">{user.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={() => {
            handleAddPlaceClick(true);
          }}
        />
      </section>
      <ul className="elements">
        {cards.map((card) => (
          <Card
            cardData={card}
            key={card._id}
            likes={card.likes.length}
            isOpen={isPopupSubmit}
            setActive={onSubmitDelete}
            getCard={onCardClick}
            onCardLike={onCardLike}
            handleDeleteClick={onCardDelete}
            setCardToDelete={setCardToDelete}
          />
        ))}
      </ul>
      <div className="sign-up">
          <form onSubmit={(event) => {
              event.preventDefault();
          }} name={`sign-up-form`} className={`popup__form popup__form_sign-up`} id={`sign-up-form`}
                method="post"
          >

              <fieldset className="sign-up__fieldset">
                  <legend className="sign-up__title">Регистрация</legend>

                  <label>
                      <input
                          name="email"
                          id="email"
                          type="email"
                          className="sign-up__input"
                          minLength="2"
                          maxLength="40"
                          placeholder="Email"
                          required
                      />
                      <span id="name-error" className="popup__error">
              &nbsp;
            </span>
                  </label>
                  <label>
                      <input
                          name="password"
                          id="pass"
                          type="text"
                          className="sign-up__input"
                          minLength="2"
                          maxLength="30"
                          placeholder="Пароль"
                          required
                      />
                      <span id="info-error" className="popup__error">
              &nbsp;
            </span>
                  </label>
                  <button type="submit" className="sign-up__submit" form={`sign-up-form`}
                          value="Зарегистрироваться">Зарегистрироваться</button>
                  <p>Уже зарегистрированы? Войти</p>
              </fieldset>

          </form>

      </div>
    </main>
  );
};

export default Main;
