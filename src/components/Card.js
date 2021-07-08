export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  _toggleLike = (evt) => evt.target.classList.toggle('cards__button-like_active');

  generateCard = () => {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.cards__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;
    cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._element.querySelector('.cards__title').textContent = this._name;
    this._element.querySelector('.cards__button-like').addEventListener('click', this._toggleLike);
    this._element.querySelector('.cards__button-delete').addEventListener('click', this._deleteCard);

    return this._element;
  }
}
