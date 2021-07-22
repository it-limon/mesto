export default class UserInfo {
  constructor({userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar =  document.querySelector(userAvatarSelector);
  }

  getUserInfo = () => {
    return {
      userId: this._userId,
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      userAvatar: this._userAvatar.src
    }
  }

  setUserInfo = ({ _id, name, about, avatar }) => {
    this._userId = _id;
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._userAvatar.src = avatar;
  }
}
