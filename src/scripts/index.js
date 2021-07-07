import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { INITIAL_CARDS, VALIDATION_SETTINGS } from './constants.js';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupImage = document.querySelector('.popup-image');

const formProfile = popupProfile.querySelector('.form-profile');
const formCard = popupCard.querySelector('.form-card');

const inputProfileName = formProfile.querySelector('.form__input_el_profile-name');
const inputProfileJob = formProfile.querySelector('.form__input_el_profile-job');
const inputCardName = formCard.querySelector('.form__input_el_card-name');
const inputCardLink = formCard.querySelector('.form__input_el_card-link');

const buttonAddCard = document.querySelector('.profile__button-add-card');
const buttonEditProfile = document.querySelector('.profile__button-edit-profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const buttonClosePopupCard = popupCard.querySelector('.popup__button-close');
const buttonClosePopupImage = popupImage.querySelector('.popup__button-close');

const cardsList = document.querySelector('.cards__list');

const img = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__image-caption');

// --- Profile functions ---

const openPopupProfile = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;

  validatorFormProfile.resetValidation(false);
  openPopup(popupProfile);
}

const submitFormProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;

  closePopup(popupProfile);
}

// --- Cards functions ---

const openPopupCard = () => {
  formCard.reset();
  validatorFormCard.resetValidation(true);
  openPopup(popupCard);
}

const submitFormCard = (evt) => {
  evt.preventDefault();

  const newCard = new Card({name: inputCardName.value, link: inputCardLink.value}, '#card-template', openPopupImage).generateCard();
  addCard(newCard);
  closePopup(popupCard);
}

// --- Image functions ---

const openPopupImage = (name, link) => {
  img.alt = name;
  img.src = link;

  caption.textContent = name;

  openPopup(popupImage);
}

// --- Common popup functions ---

const closePopupOpened = () => {
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
}

const closePopupOnEsc = (evt) => {
  if (evt.key.toLowerCase() === 'escape') {
    closePopupOpened();
  }
}

const closePopupOnClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupOpened();
  }
}

const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('click', closePopupOnClick);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupOnEsc);
  popup.removeEventListener('click', closePopupOnClick);
  popup.classList.remove('popup_opened');
}

// ------------------------------

const addCard = (card) => cardsList.prepend(card);

// --- Listeners ---

buttonEditProfile.addEventListener('click', openPopupProfile);
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
formProfile.addEventListener('submit', submitFormProfile);

buttonAddCard.addEventListener('click', openPopupCard);
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));
formCard.addEventListener('submit', submitFormCard);

buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));

// Add initial cards
INITIAL_CARDS.forEach((card) => {
  const newCard = new Card(card, '#card-template', openPopupImage).generateCard();
  addCard(newCard);
});

// Enable validation
const validatorFormProfile = new FormValidator(VALIDATION_SETTINGS, formProfile);
const validatorFormCard = new FormValidator(VALIDATION_SETTINGS, formCard);

validatorFormProfile.enableValidation();
validatorFormCard.enableValidation();
