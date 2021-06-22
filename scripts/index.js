import initialCards from './initial-cards.js'
import Card from './Card.js';
import FormValidator, { validationSettings } from './FormValidator.js';

// --- Profile ---
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const closeProfilePopupBtn = profilePopup.querySelector('.popup__close-button');

const profileForm = profilePopup.querySelector('.form-profile');
const submitProfileBtn = profileForm.querySelector('.form__submit-button');
const inputProfileName = profileForm.querySelector('.form__input_el_profile-name');
const inputProfileJob = profileForm.querySelector('.form__input_el_profile-job');

const openProfilePopupHandler = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;

  resetFormErrors(profileForm);
  submitProfileBtn.classList.remove('form__submit-button_disabled');

  openPopup(profilePopup);
}

const submitProfileFormHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;

  closePopup(profilePopup);
}

// --- Cards ---
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

const addCardBtn = document.querySelector('.profile__add-card-button');

const cardPopup = document.querySelector('.popup-card');
const closeCardPopupBtn = cardPopup.querySelector('.popup__close-button');

const cardForm = cardPopup.querySelector('.form-card');
const submitCardBtn = cardForm.querySelector('.form__submit-button');
const inputCardName = cardForm.querySelector('.form__input_el_card-name');
const inputCardLink = cardForm.querySelector('.form__input_el_card-link');

const openCardPopupHandler = () => {
  cardForm.reset();

  resetFormErrors(cardForm);
  submitCardBtn.classList.add('form__submit-button_disabled');

  openPopup(cardPopup);
}

const submitCardFormHandler = (evt) => {
  evt.preventDefault();

  const newCard = new Card({name: inputCardName.value, link: inputCardLink.value}, '#card-template', openImagePopupHandler).generateCard();
  addCard(newCard);
  closePopup(cardPopup);
}

// --- Image ---
const imagePopup = document.querySelector('.popup-image');
const img = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__image-caption');

const closeImagePopupBtn = imagePopup.querySelector('.popup__close-button');

const openImagePopupHandler = (name, link) => {
  img.alt = name;
  img.src = link;

  caption.textContent = name;

  openPopup(imagePopup);
}

const closeOpenedPopup = () => {
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
}

const closePopupOnEscHandler = (evt) => {
  if (evt.key.toLowerCase() === 'escape') {
    closeOpenedPopup();
  }
}

const closePopupOnClickHandler = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeOpenedPopup();
  }
}

// Функции открытия/закрытия popup'а
const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupOnEscHandler);
  popup.addEventListener('click', closePopupOnClickHandler);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupOnEscHandler);
  popup.removeEventListener('click', closePopupOnClickHandler);
  popup.classList.remove('popup_opened');
}

// Функция сброса стилей ошибок с элементов формы
const resetFormErrors = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('form__input_type_error');
  });

  const errorList = Array.from(formElement.querySelectorAll('.form__input-error'));
  errorList.forEach((errorElement) => {
    errorElement.classList.remove('form__input-error_visible');
    errorElement.textContent = '';
  });
}

// Функция добавления карточки
const addCard = (card) => cardsContainer.prepend(card);

// Добавим начальный набор карточек
initialCards.forEach((card) => {
  const newCard = new Card(card, '#card-template', openImagePopupHandler).generateCard();
  addCard(newCard);
});

// подключим валидацию
const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
formList.forEach((form) => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
});

// Слушатели
editProfileBtn.addEventListener('click', openProfilePopupHandler);
closeProfilePopupBtn.addEventListener('click', () => closePopup(profilePopup));
profileForm.addEventListener('submit', submitProfileFormHandler);

addCardBtn.addEventListener('click', openCardPopupHandler);
closeCardPopupBtn.addEventListener('click', () => closePopup(cardPopup));
cardForm.addEventListener('submit', submitCardFormHandler);

closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));
