import Popup from './Popup.js';
import FormValidator from './FormValidator.js';
import { validation_settings } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, isButtonSubmitDisabled) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll('.form__input');

    this._validator = new FormValidator(validation_settings, this._form, isButtonSubmitDisabled);
    this._validator.enableValidation();

    this.setEventListeners();
  }

  _getInputValues = () => {
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setInputValues = (item) => {
    this._inputList.forEach((input, idx) => input.value = item[idx]);
  }

  open = () => {
    this._validator.resetValidation();
    super.open();
  }

  close = () => {
    this._form.reset();
    super.close();
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
