class mestoApi {
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

  registration(pass, email) {
    return fetch(this._url + "/signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: pass,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  signin(pass, email) {
    return fetch(this._url + "/signin", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: pass,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  getContent(token) {
    return fetch(this._url + "/signin", {
      method: "GET",
      headers: this._headers,
      body: JSON.stringify({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    }).then(this._checkResponse);
  }
}

const authMesto = new mestoApi("https://auth.nomoreparties.co", {
  "Content-Type": "application/json",
});
export default authMesto;
