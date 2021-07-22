export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _promiseHandler(promise) {
    return promise
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  getUserInfo() {
    return this._promiseHandler(fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }));
  }

  setUserInfo(name, about) {
    return this._promiseHandler(fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }));
  }

  setUserAvatar(avatar) {
    return this._promiseHandler(fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }));
  }

  getInitialCards() {
    return this._promiseHandler(fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }));
  }

  addCard(name, link) {
    return this._promiseHandler(fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }));
  }

  deleteCard(cardId) {
    return this._promiseHandler(fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }));
  }

  addLike(cardId) {
    return this._promiseHandler(fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }));
  }

  deleteLike(cardId) {
    return this._promiseHandler(fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }));
  }
}
