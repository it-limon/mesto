export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(validationSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(validationSettings.submitButtonSelector);
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    const inactiveButtonClass = this._validationSettings.inactiveButtonClass;

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  _showInputError = (inputElement, errorMessage) => {
    const {
      inputErrorClass,
      errorClass
    } = this._validationSettings;

    inputElement.classList.add(inputErrorClass);

    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError = (inputElement) => {
    const {
      inputErrorClass,
      errorClass
    } = this._validationSettings;

    inputElement.classList.remove(inputErrorClass);

    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation = (isButtonSubmitDisabled) => {
    const {
      inputSelector,
      inputErrorClass,
      errorClass,
      inactiveButtonClass
    } = this._validationSettings;

    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(inputErrorClass);
    });

    const errorList = Array.from(this._formElement.querySelectorAll(`${inputSelector}-error`));
    errorList.forEach((errorElement) => {
      errorElement.classList.remove(errorClass);
      errorElement.textContent = '';
    });

    if (isButtonSubmitDisabled) {
      this._buttonElement.classList.add(inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
    }
  }
}
