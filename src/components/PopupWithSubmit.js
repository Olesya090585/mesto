import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(action) {
    this._functionConfirmation = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._functionConfirmation();
      this.close();
    });
  }
}
