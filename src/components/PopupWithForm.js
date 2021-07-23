import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll('.form__input');
    this._buttonSubmit = this._form.querySelector('.form__button-submit');
    this._buttonSubmitDefaultText = this._buttonSubmit.textContent;
  }

  _getInputValues = () => {
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setInputValues = (item) => {
    this._inputList.forEach((input, idx) => input.value = item[idx]);
  }

  close = () => {
    this._form.reset();
    super.close();
  }

  renderSaving = (isSaving) => {
    if (isSaving) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitDefaultText;
    }
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
