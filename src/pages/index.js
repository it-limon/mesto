import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { validationSettings, apiOptions } from '../utils/constants.js';

const buttonAddCard = document.querySelector('.profile__button-add-card');
const buttonEditProfile = document.querySelector('.profile__button-edit-profile');
const buttonEditAvatar = document.querySelector('.profile__button-edit-avatar');
const buttonConfirmDeleteCard = document.forms['form-delete-card'].querySelector('.form__button-submit');

const api = new Api(apiOptions);

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar'
});

const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
  .then((results) => {
    userInfo.setUserInfo(results[0]);
    cardsList.renderItems(results[1].reverse())
  })
  .catch(err => console.log(err));

const generateCard = (item) => {
  const card = new Card({
    data: item,
    userId: userInfo.getUserInfo().userId,
    cardSelector: '#card-template',
    handleCardClick: (name, link) => popupImage.open(name, link),
    handleLikeClick: (cardId, isLiked) => {
      if (isLiked) {
        api.deleteLike(cardId)
          .then(info => card.setLikesInfo(info))
          .catch(err => console.log(err));
      } else {
        api.addLike(cardId)
          .then(info => card.setLikesInfo(info))
          .catch(err => console.log(err));
      }
    },
    handleDeleteClick: () => popupDeleteCard.open()
  });

  return card.generateCard();
}

// Popups
const popupProfile = new PopupWithForm({
  popupSelector: '.popup-profile',
  handleFormSubmit: (item) => {
    popupProfile.renderSaving(true);

    const name = item['profile-name'];
    const job = item['profile-job'];

    api.setUserInfo(name, job)
      .then(info => userInfo.setUserInfo(info))
      .catch(err => console.log(err))
      .finally(() => popupProfile.renderSaving(false));
  }
});

const popupCard = new PopupWithForm({
  popupSelector: '.popup-card',
  handleFormSubmit: (item) => {
    popupCard.renderSaving(true);

    const name = item['card-name'];
    const link = item['card-link'];

    api.addCard(name, link)
      .then(data => {
        const cardElement = generateCard(data);
        cardsList.addItem(cardElement);
      })
      .catch(err => console.log(err))
      .finally(() => popupCard.renderSaving(false));
  }
});

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup-avatar',
  handleFormSubmit: (item) => {
    popupAvatar.renderSaving(true);
    const avatar = item['avatar-link'];

    api.setUserAvatar(avatar)
      .then(info => userInfo.setUserInfo(info))
      .catch(err => console.log(err))
      .finally(() => popupAvatar.renderSaving(false));
  }
});

const popupDeleteCard = new PopupWithForm({
  popupSelector: '.popup-delete-card',
  handleFormSubmit: (item) => {
    // const avatar = item['avatar-link'];

    api.deleteCard(cardId)
    //   .then(info => userInfo.setUserInfo(info))
    //   .catch(err => console.log(err));
  }
});

const popupImage = new PopupWithImage('.popup-image');

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

// Listeners
buttonEditProfile.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  const inputValues = [info.userName, info.userJob];
  popupProfile.setInputValues(inputValues);
  validatorFormProfile.resetValidation();
  popupProfile.open();
});

buttonEditAvatar.addEventListener('click', () => {
  const avatar = [userInfo.getUserInfo().userAvatar];
  popupAvatar.setInputValues(avatar);
  validatorFormAvatar.resetValidation();
  popupAvatar.open();
});

buttonConfirmDeleteCard.addEventListener('click', popupDeleteCard.open);

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

// Enable validation
const validatorFormProfile = new FormValidator(validationSettings, document.forms['form-profile']);
const validatorFormCard = new FormValidator(validationSettings, document.forms['form-card']);
const validatorFormAvatar = new FormValidator(validationSettings, document.forms['form-avatar']);

validatorFormProfile.enableValidation();
validatorFormCard.enableValidation();
validatorFormAvatar.enableValidation();
