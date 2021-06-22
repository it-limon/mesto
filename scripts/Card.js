export default class Card {
  constructor(data, cardSelector, handleOpenCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenCard = handleOpenCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard = (evt) => evt.target.closest('.cards__item').remove();
  _handleToggleLike = (evt) => evt.target.classList.toggle('cards__like_active');

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.cards__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;
    cardImage.addEventListener('click', () => this._handleOpenCard(this._name, this._link));

    this._element.querySelector('.cards__title').textContent = this._name;
    this._element.querySelector('.cards__like').addEventListener('click', this._handleToggleLike);
    this._element.querySelector('.cards__delete-button').addEventListener('click', this._handleDeleteCard);

    return this._element;
  }
}
