export default class Card {
  constructor({ data, userId, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._buttonLikeActiveSelector = 'cards__button-like_active';
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _isLiked = () => {
    return this._likes.some(like => like._id === this._userId);
  }

  setLikesInfo = (info) => {
    this._likes = info.likes;
    this._likeCounter.textContent = this._likes.length;

    if (this._isLiked()) {
      this._buttonLike.classList.add(this._buttonLikeActiveSelector);
    } else {
      this._buttonLike.classList.remove(this._buttonLikeActiveSelector);
    }
  }

  generateCard = () => {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.cards__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;
    cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._likeCounter = this._element.querySelector('.cards__like-counter');
    this._likeCounter.textContent = this._likes.length;

    this._buttonLike = this._element.querySelector('.cards__button-like');
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id, this._isLiked()));
    if (this._isLiked()) {
      this._buttonLike.classList.add(this._buttonLikeActiveSelector);
    }

    let buttonDelete = this._element.querySelector('.cards__button-delete');
    if (this._ownerId === this._userId) {
      buttonDelete.addEventListener('click', this._deleteCard);
    } else {
      buttonDelete.remove();
      buttonDelete = null;
    }

    this._element.querySelector('.cards__title').textContent = this._name;

    return this._element;
  }
}
