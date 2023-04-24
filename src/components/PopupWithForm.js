import { config } from "./constants.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(config.formSelector);
    this._inputList = this._popupElement.querySelectorAll(config.inputSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // const inputValues = this._getInputValues();
      this._handleFormSubmit(this._getInputValues());
      console.log(this._formValues);
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
