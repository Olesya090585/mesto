import { validationConfig } from "../utils/constants.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(validationConfig.formSelector);
    this._inputList = this._popupElement.querySelectorAll(validationConfig.inputSelector);
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
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
