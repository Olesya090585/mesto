
export class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  disableButton = () => {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  };

  enableButton = () => {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  };

  _showInputError = (input, validationMessage) => {
    const errorTextElement = this._form.querySelector(
      `${this._config.inputErrorClass}${input.name}`
    );
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (input) => {
    const errorTextElement = this._form.querySelector(
      `${this._config.inputErrorClass}${input.name}`
    );
    errorTextElement.textContent = "";
    errorTextElement.classList.remove(this._config.errorClass);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((input) => !input.validity.valid);
  };

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
