import '../pages/index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationSettings } from '../utils/constants.js';

const buttonAddCard = document.querySelector('.profile__button-add-card');
const buttonEditProfile = document.querySelector('.profile__button-edit-profile');

const generateCard = (item) => {
  const card = new Card(item, '#card-template', (name, link) => popupImage.open(name, link));
  return card.generateCard();
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job'
});

// Popups
const popupProfile = new PopupWithForm({
  popupSelector: '.popup-profile',
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item['profile-name'], item['profile-job']);
  }
}, false);

const popupCard = new PopupWithForm({
  popupSelector: '.popup-card',
  handleFormSubmit: (item) => {
    const cardElement = generateCard({name: item['card-name'],
      link: item['card-link']
    });
    cardsList.addItem(cardElement);
  }
}, true);

const popupImage = new PopupWithImage('.popup-image');

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();

// Listeners
buttonEditProfile.addEventListener('click', () => {
  const inputValues = Object.values(userInfo.getUserInfo());
  popupProfile.setInputValues(inputValues);
  validatorFormProfile.resetValidation();
  popupProfile.open();
});

buttonAddCard.addEventListener('click', () => {
  validatorFormCard.resetValidation();
  popupCard.open();
});

// Add initial cards
const cardsList = new Section(
  (item) => {
    const cardElement = generateCard(item);
    cardsList.addItem(cardElement);
  }, '.cards__list')

cardsList.renderItems(initialCards);

// Enable validation
const validatorFormProfile = new FormValidator(validationSettings, document.querySelector('.form-profile'));
const validatorFormCard = new FormValidator(validationSettings, document.querySelector('.form-card'));

validatorFormProfile.enableValidation();
validatorFormCard.enableValidation();
