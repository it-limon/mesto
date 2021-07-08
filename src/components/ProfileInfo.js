export default class ProfileInfo {
  constructor({profileNameSelector, profileJobSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getProfileInfo = () => {
    return {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent
    }
  }

  setProfileInfo = (profileName, profileJob) => {
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
}
