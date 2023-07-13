import React from "react";
import ok from "../images/Union.svg";

export default function InfoTooltip({
                                        isOpen,
                                        name,
                                        onClose
                                    }) {

    return (
        <div className={isOpen ? `popup popup_${name} popup_opened ` : `popup`} onClick={() => {
            onClose();
        }}>
            <div className="popup__conteiner" onClick={event => event.stopPropagation()}>
                <button type="button" className="popup__close-button" onClick={onClose}/>
                        <img src={ok} alt="логотип" className="popup__status-image" />
                        <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
            </div>
        </div>
    );
}