class Api {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }

  //функция отрисовки стандартных карточек
  getCards(token) {
    return fetch(this._url + "/cards", {
      headers: {
        "Authorization" : `Bearer ${token}`
    },
    }).then(this._checkResponse);
  }

  //функция получения и установки имени профиля
  getProfileInfo(token) {
    return fetch(this._url + "/users/me", {
      headers: {
        "Authorization" : `Bearer ${token}`
    },
    }).then(this._checkResponse);
  }

  //функция отправки имени на серв
  setName(profile,token) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    },
      body: JSON.stringify({
        name: profile.Name,
        about: profile.Info,
      }),
    }).then(this._checkResponse);
  }

  //функция добавления новой карточки на серв
  newCard(cardName, cardLink,token) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._checkResponse);
  }

  //функция удаления карточки по id
  deleteCard(id,token) {
    return fetch(this._url + `/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    },
    }).then(this._checkResponse);
  }

  //функция аватара отправки ссылки аватара
  sendAvatar(avatarLink,token) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
//возможно убрать "Content-Type": "application/json"
  putLike(cardId, token) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    },
    }).then(this._checkResponse);
  }

  deleteLike(cardId, token) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    },
    }).then(this._checkResponse);
  }

}

const api = new Api("http://localhost:3000");
export default api;
