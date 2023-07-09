import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({
  likes,
  isOpen,
  setActive,
  cardData,
  getCard,
  onCardLike,
  setCardToDelete,
}) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = cardData.owner._id === user._id;
  const isLiked = cardData.likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;
  return (
    <li className="elements__item">
      <img
        src={cardData.link}
        alt={cardData.name}
        className="elements__image"
        onClick={() => {
          getCard(cardData);
        }}
      />
      <div className="elements__info">
        <p className="elements__text">{cardData.name}</p>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(cardData)}
          />
          <p className="elements__like-counter">{likes}</p>
        </div>
        {isOwn && (
          <button
            type="button"
            className="elements__delete"
            onClick={() => {
              setActive(!isOpen);
              setCardToDelete(cardData);
            }}
          />
        )}
      </div>
    </li>
  );
}
