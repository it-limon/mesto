const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');

const infoEditBtn = document.querySelector('.profile__info-edit-button');

const popup = document.querySelector('.popup');

const submitPopupBtn = popup.querySelector('.popup__button-submit');
const closePopupBtn = popup.querySelector('.popup__button-close');
const inputName = popup.querySelector('.popup__item_el_name');
const inputJob = popup.querySelector('.popup__item_el_job');

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
submitPopupBtn.addEventListener('click', submitPopupHandler);
