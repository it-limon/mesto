import '../pages/index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import ProfileInfo from '../components/ProfileInfo.js';
import { initial_cards } from '../utils/constants.js';

const buttonAddCard = document.querySelector('.profile__button-add-card');
const buttonEditProfile = document.querySelector('.profile__button-edit-profile');

const profileInfo = new ProfileInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job'
});

// Popups
const popupProfile = new PopupWithForm({
  popupSelector: '.popup-profile',
  handleFormSubmit: (item) => {
    profileInfo.setProfileInfo(item['profile-name'], item['profile-job']);
  }
}, false);

const popupCard = new PopupWithForm({
  popupSelector: '.popup-card',
  handleFormSubmit: (item) => {
    const card = new Card({
      name: item['card-name'],
      link: item['card-link']
    }, '#card-template', openPopupImage);

    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, true);

const popupImage = new PopupWithImage('.popup-image');
const openPopupImage = (name, link) => popupImage.open(name, link);

// Listeners
buttonEditProfile.addEventListener('click', () => {
  const inputValues = Object.values(profileInfo.getProfileInfo());
  popupProfile.setInputValues(inputValues);
  popupProfile.open();
});

buttonAddCard.addEventListener('click', popupCard.open);

// Add initial cards
const cardsList = new Section({
  items: initial_cards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', openPopupImage);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, '.cards__list')

cardsList.renderItems();
