let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');

let infoEditBtn = document.querySelector('.profile__info-edit-button');

let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');

let submitPopupBtn = popupContainer.querySelector('.popup__button-submit');
let closePopupBtn = popupContainer.querySelector('.popup__button-close');
let inputName = popupContainer.querySelector('.popup__item_el_name');
let inputJob = popupContainer.querySelector('.popup__item_el_job');

const openPopupHandler = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  popup.classList.add('popup_opened');
}

const closePopupHandler = () => {
  popup.classList.remove('popup_opened');
}

const submitPopupHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopupHandler();
}

infoEditBtn.addEventListener('click', openPopupHandler);
closePopupBtn.addEventListener('click', closePopupHandler);
popupContainer.addEventListener('submit', submitPopupHandler);
