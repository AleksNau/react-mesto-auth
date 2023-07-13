import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  /*export const getContent= (token) => {
return fetch(``)
    }*/

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);
  function handlEmail(e) {
    setEmail(e.target.value);
  }

  // input change
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit() {
    //заглушка запроса
    onRegister(email, password)
    //закоментил работающий код
      /*.then(resetForm) //очищаем форму
      .then(() => {
        history("/sign-in");
      }) //после успешного запроса пробрасываем пользователя на логин
      .catch(console.error);*/
  }

  return (
    <div className="sign-up">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        name={`sign-up-form`}
        className={`popup__form popup__form_sign-up`}
        id={`sign-up-form`}
        method="post"
        noValidate
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
              onChange={handlEmail}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span id="info-error" className="popup__error">
              &nbsp;
            </span>
          </label>
          <button
            type="submit"
            className="sign-up__submit"
            form={`sign-up-form`}
            value="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
          <p className="sign-up__sub">Уже зарегистрированы? Войти</p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
