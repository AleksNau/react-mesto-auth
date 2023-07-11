class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }

  //функция отрисовки стандартных карточек
  getCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //функция получения и установки имени профиля
  getProfileInfo() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //функция отправки имени на серв
  setName(profile) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profile.Name,
        about: profile.Info,
      }),
    }).then(this._checkResponse);
  }

  //функция добавления новой карточки на серв
  newCard(cardName, cardLink) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._checkResponse);
  }

  //функция удаления карточки по id
  deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //функция аватара отправки ссылки аватара
  sendAvatar(avatarLink) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  /*заготовки под запросы на регистрацию и авторизацию
    registration(pass,email) {
        return fetch( 'https://auth.nomoreparties.co' + '/signup', {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({
                "password": pass,
                "email": email 
            })
        }
        )
            .then(this._checkResponse);
    }


    signin(pass,email) {
        return fetch( 'https://auth.nomoreparties.co' + '/signin', {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({
                "password": pass,
                "email": email 
            })
        }
        )
            .then(this._checkResponse);
    }*/
}

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-66", {
  authorization: "15d7e2e1-013e-46c1-bf6c-b7380245bfba",
  "Content-Type": "application/json",
});
export default api;
