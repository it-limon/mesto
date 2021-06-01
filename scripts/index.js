const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');

const editInfoBtn = document.querySelector('.profile__info-edit-button');

const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__button-close');

const formProfile = popup.querySelector('.form-profile');
const submitProfileBtn = formProfile.querySelector('.form-profile__button-submit');

const inputName = formProfile.querySelector('.form-profile__item_el_name');
const inputJob = formProfile.querySelector('.form-profile__item_el_job');

const togglePopupHandler = () => popup.classList.toggle('popup_opened');

const openPopupHandler = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  togglePopupHandler();
}

const submitFormProfileHandler = evt => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  togglePopupHandler();
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

// Слушатели
editInfoBtn.addEventListener('click', openPopupHandler);
closePopupBtn.addEventListener('click', togglePopupHandler);
formProfile.addEventListener('submit', submitFormProfileHandler);
