// Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const closeProfilePopupBtn = profilePopup.querySelector('.popup__close-button');

const profileForm = profilePopup.querySelector('.form-profile');
const inputProfileName = profileForm.querySelector('.form__item_el_profile-name');
const inputProfileJob = profileForm.querySelector('.form__item_el_profile-job');

const openProfilePopupHandler = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;

  togglePopup(profilePopup);
}

const submitProfileFormHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;

  togglePopup(profilePopup);
}

// Cards
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

const addCardBtn = document.querySelector('.profile__add-card-button');

const cardPopup = document.querySelector('.popup-card');
const closeCardPopupBtn = cardPopup.querySelector('.popup__close-button');

const cardForm = cardPopup.querySelector('.form-card');
const inputCardName = cardForm.querySelector('.form__item_el_card-name');
const inputCardLink = cardForm.querySelector('.form__item_el_card-link');

const openCardPopupHandler = () => {
  inputCardName.value = '';
  inputCardLink.value = '';

  togglePopup(cardPopup);
}

const submitCardFormHandler = (evt) => {
  evt.preventDefault();

  addCard(getCard({name: inputCardName.value, link: inputCardLink.value}));

  togglePopup(cardPopup);
}

// Image
const imagePopup = document.querySelector('.popup-image');
const closeImagePopupBtn = imagePopup.querySelector('.popup__close-button');

const togglePopup = (popup) => popup.classList.toggle('popup_opened');

// Функция создания карточки
const getCard = ({name, link}) => {
  const cardsItem = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardsImage = cardsItem.querySelector('.cards__image');
  cardsImage.src = link;
  cardsImage.alt = name;

  cardsItem.querySelector('.cards__title').textContent = name;

  cardsItem.querySelector('.cards__image').addEventListener('click', () => {
    const img = imagePopup.querySelector('.popup__image');

    img.src = link;
    img.alt = name;

    imagePopup.querySelector('.popup__image-caption').textContent = name;

    togglePopup(imagePopup);
  });

  cardsItem.querySelector('.cards__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like_active');
  });

  cardsItem.querySelector('.cards__delete-button').addEventListener('click', (evt) => {
    evt.target.closest('.cards__item').remove();
  });

  return cardsItem;
}

// Функция добавления карточки
const addCard = (card) => cardsContainer.prepend(card);

// Добавим начальный набор карточек
initialCards.forEach((card) => addCard(getCard(card)));

// Слушатели
editProfileBtn.addEventListener('click', openProfilePopupHandler);
closeProfilePopupBtn.addEventListener('click', () => togglePopup(profilePopup));
profileForm.addEventListener('submit', submitProfileFormHandler);

addCardBtn.addEventListener('click', openCardPopupHandler);
closeCardPopupBtn.addEventListener('click', () => togglePopup(cardPopup));
cardForm.addEventListener('submit', submitCardFormHandler);

closeImagePopupBtn.addEventListener('click', () => togglePopup(imagePopup));
