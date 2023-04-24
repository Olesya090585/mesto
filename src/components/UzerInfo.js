export class UserInfo {
  constructor(profileNameSelector, profileJobSelector){
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileJobSelector = document.querySelector(profileJobSelector);
  }

getUserInfo(){
  return{
    name: this._profileNameSelector.textContent,
    job: this._profileJobSelector.textContent
  }
}

setUserInfo({ name, job }){
  this._profileNameSelector.textContent = name;
  this._profileJobSelector.textContent = job;
}
}
