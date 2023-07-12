import React from "react";
import { Route, Routes } from "react-router";
import logo from "../images/logo.svg";

const Header = ({loggedIn}) => {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <Routes>
        <Route path="/sign-in" element={<button className="header__button">Зарегистрироваться</button>}></Route>
        <Route path="/sign-up" element={<button className="header__button">Войти</button>}></Route>
        <Route path="/" element={<button className="header__button">Email Выйти</button>}></Route>
      </Routes>
      
    </header>
  );
};

export default Header;
