import React,{useState} from "react";


const Register = () => {
    /*export const getContent= (token) => {
return fetch(``)
    }*/

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
  function handlEmail(e) {
    setEmail(e.target.value);
  }

  // input change
  function handlePassword(e) {
    setPassword(e.target.value);
  }


    return (
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
                            onChange={handlePassword}
                            required
                        />
                        <span id="info-error" className="popup__error">
              &nbsp;
            </span>
                    </label>
                    <button type="submit" className="sign-up__submit" form={`sign-up-form`}
                            value="Зарегистрироваться">Зарегистрироваться</button>
                    <p className="sign-up__sub">Уже зарегистрированы? Войти</p>
                </fieldset>

            </form>

        </div>
    );
};

export default Register;
