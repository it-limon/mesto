import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { validationSettings, apiOptions } from '../utils/constants.js';

const buttonAddCard = document.querySelector('.profile__button-add-card');
const buttonEditProfile = document.querySelector('.profile__button-edit-profile');
const buttonEditAvatar = document.querySelector('.profile__button-edit-avatar');

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar'
});

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
    handleDeleteClick: (cardId) => {
      popupConfirm.setSubmitAction(() => {
        api.deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupConfirm.close();
          })
          .catch(err => console.log(err));
      });
      popupConfirm.open();
    }
  });

  return card.generateCard();
}

const cardsList = new Section(
  (item) => {
    const cardElement = generateCard(item);
    cardsList.addItem(cardElement);
  }, '.cards__list');

const api = new Api(apiOptions);

const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards.reverse())
  })
  .catch(err => console.log(err));

// Popups
const popupProfile = new PopupWithForm({
  popupSelector: '.popup-profile',
  handleFormSubmit: (item) => {
    popupProfile.renderSaving(true);

    const name = item['profile-name'];
    const job = item['profile-job'];

    api.setUserInfo(name, job)
      .then(info => {
        userInfo.setUserInfo(info);
        popupProfile.close();
      })
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
        popupCard.close();
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
      .then(info => {
        userInfo.setUserInfo(info);
        popupAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupAvatar.renderSaving(false));
  }
});

const popupConfirm = new PopupWithConfirm('.popup-confirm');

const popupImage = new PopupWithImage('.popup-image');

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();

// Listeners
buttonEditProfile.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  const inputValues = [info.userName, info.userJob];
  popupProfile.setInputValues(inputValues);
  validatorFormProfile.resetValidation();
  popupProfile.open();
});

buttonEditAvatar.addEventListener('click', () => {
  validatorFormAvatar.resetValidation();
  popupAvatar.open();
});

buttonAddCard.addEventListener('click', () => {
  validatorFormCard.resetValidation();
  popupCard.open();
});

// Enable validation
const validatorFormProfile = new FormValidator(validationSettings, document.forms['form-profile']);
const validatorFormCard = new FormValidator(validationSettings, document.forms['form-card']);
const validatorFormAvatar = new FormValidator(validationSettings, document.forms['form-avatar']);

validatorFormProfile.enableValidation();
validatorFormCard.enableValidation();
validatorFormAvatar.enableValidation();
