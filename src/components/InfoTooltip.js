import React from "react";

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

                        <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
            </div>
        </div>
    );
}