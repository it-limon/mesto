// --- Profile ---
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const closeProfilePopupBtn = profilePopup.querySelector('.popup__close-button');

const profileForm = profilePopup.querySelector('.form-profile');
const inputProfileName = profileForm.querySelector('.form__input_el_profile-name');
const inputProfileJob = profileForm.querySelector('.form__input_el_profile-job');

const openProfilePopupHandler = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;

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
const inputCardName = cardForm.querySelector('.form__input_el_card-name');
const inputCardLink = cardForm.querySelector('.form__input_el_card-link');

const openCardPopupHandler = () => {
  cardForm.reset();

  openPopup(cardPopup);
}

const submitCardFormHandler = (evt) => {
  evt.preventDefault();

  addCard(getCard({name: inputCardName.value, link: inputCardLink.value}));

  closePopup(cardPopup);
}

const deleteCardHandler = (evt) => evt.target.closest('.cards__item').remove();
const toggleCardLikeHandler = (evt) => evt.target.classList.toggle('cards__like_active');

// Функция создания карточки
const getCard = ({name, link}) => {
  const cardsItem = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardsImage = cardsItem.querySelector('.cards__image');
  cardsImage.addEventListener('click', () => openImagePopupHandler(name, link));
  cardsImage.alt = name;
  cardsImage.src = link;

  cardsItem.querySelector('.cards__title').textContent = name;
  cardsItem.querySelector('.cards__like').addEventListener('click', toggleCardLikeHandler);
  cardsItem.querySelector('.cards__delete-button').addEventListener('click', deleteCardHandler);

  return cardsItem;
}

// Функция добавления карточки
const addCard = (card) => cardsContainer.prepend(card);

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

// Функции открытия/закрытия popup'ов
const openPopup = (popup) => popup.classList.add('popup_opened');
const closePopup = (popup) => popup.classList.remove('popup_opened');

// Добавим начальный набор карточек
initialCards.forEach((card) => addCard(getCard(card)));

// Слушатели
editProfileBtn.addEventListener('click', openProfilePopupHandler);
closeProfilePopupBtn.addEventListener('click', () => closePopup(profilePopup));
profileForm.addEventListener('submit', submitProfileFormHandler);

addCardBtn.addEventListener('click', openCardPopupHandler);
closeCardPopupBtn.addEventListener('click', () => closePopup(cardPopup));
cardForm.addEventListener('submit', submitCardFormHandler);

closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));
