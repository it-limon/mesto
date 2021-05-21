let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');

let infoEditBtn = document.querySelector('.profile__info-edit-button');

let popup = document.querySelector('.popup');
let closePopupBtn = popup.querySelector('.popup__button-close');

let formProfile = popup.querySelector('.form-profile');
let submitProfileBtn = formProfile.querySelector('.form-profile__button-submit');

let inputName = formProfile.querySelector('.form-profile__item_el_name');
let inputJob = formProfile.querySelector('.form-profile__item_el_job');

const openPopupHandler = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  popup.classList.add('popup_opened');
}

const closePopupHandler = () => {
  popup.classList.remove('popup_opened');
}

const submitFormProfileHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopupHandler();
}

infoEditBtn.addEventListener('click', openPopupHandler);
closePopupBtn.addEventListener('click', closePopupHandler);
formProfile.addEventListener('submit', submitFormProfileHandler);
