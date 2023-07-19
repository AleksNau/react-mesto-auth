import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingText from "../contexts/loadingContext";
import { useForm } from "../hooks/useForm";

export default function EditProfilePopup({
  onUpdateUser,
  isOpen,
  popupName,
  onClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const isLoading = React.useContext(LoadingText);
  const {values, handleChange, setValues} = useForm({});


  React.useEffect(() => {
    if (isOpen) {
      setValues(name);
      setValues(about);
    }
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser(values);
  }
//useForm работает но не отправляет всё и сразу нужно переходить в поля сразу
  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name={popupName}
      buttonValue={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      tittle={"Редактировать профиль"}
      children={
        <>
          <label>
            <input
              name="name"
              id="name"
              type="text"
              className="popup__input popup__input_type_name"
              minLength="2"
              maxLength="40"
              onChange={(e) =>handleChange(e)}
              required
            />
            <span id="name-error" className="popup__error">
              &nbsp;
            </span>
          </label>
          <label>
            <input
              name="about"
              id="info"
              type="text"
              className="popup__input popup__input_type_info"
              minLength="2"
              maxLength="200"
              onChange={(e) =>handleChange(e)}
              required
            />
            <span id="info-error" className="popup__error">
              &nbsp;
            </span>
          </label>
        </>
      }
    />
  );
}
