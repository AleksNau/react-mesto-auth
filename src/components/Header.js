import React from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({email,signOut}) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <Routes>
        <Route path="/sign-in" element={<button className="header__button" onClick={() => {navigate("/sign-up")}}>Регистрация</button>}></Route>
        <Route path="/sign-up" element={<button className="header__button" onClick={() => {navigate("/sign-in")}}>Войти</button>}></Route>
        <Route path="/" element={<button className="header__button" onClick={signOut}>{`${email} Выйти`}</button>}></Route>
      </Routes>
      
    </header>
  );
};

export default Header;
