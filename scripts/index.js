// Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const closeProfileBtn = profilePopup.querySelector('.popup__close-button');

const formProfile = profilePopup.querySelector('.form-profile');
const inputProfileName = formProfile.querySelector('.form__item_el_profile-name');
const inputProfileJob = formProfile.querySelector('.form__item_el_profile-job');

const openProfilePopupHandler = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;

  togglePopupHandler(profilePopup);
}

const closeProfilePopupHandler = () => {
  togglePopupHandler(profilePopup);
}

const submitFormProfileHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;

  togglePopupHandler(profilePopup);
}

// Функция создания карточки
const createCard = ({name, link}) => {
  const cardsItem = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardsImage = cardsItem.querySelector('.cards__image');
  cardsImage.src = link;
  cardsImage.alt = name;

  const cardsTitle = cardsItem.querySelector('.cards__title');
  cardsTitle.textContent = name;

  return cardsItem;
}

// Функция добавления карточки
const addCard = (card) => cardsContainer.append(card);

// Добавим начальный набор карточек
initialCards.forEach(card => addCard(createCard(card)));

const togglePopupHandler = (popup) => popup.classList.toggle('popup_opened');

// Слушатели
editProfileBtn.addEventListener('click', openProfilePopupHandler);
closeProfileBtn.addEventListener('click', closeProfilePopupHandler);
formProfile.addEventListener('submit', submitFormProfileHandler);
