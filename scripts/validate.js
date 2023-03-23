// показать ошибку
const showInputError = (errorTextElement, validationMessage, errorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(errorClass);
};


// скрыть ошибку
const hideInputError = (errorTextElement, errorClass) => {
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(errorClass);
};

// функция проверки валидности полей
const checkInputValidity = (formElement, input, inputErrorClass, errorClass) => {
  const errorTextElement = formElement.querySelector(`${inputErrorClass}${input.name}`);
  if (!input.validity.valid){
    showInputError(errorTextElement, input.validationMessage, errorClass);
  } else {
    hideInputError(errorTextElement, errorClass);
  }
}
const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

const toggleButtonState = (submitButton, inactiveButtonClass, inputList) => {
  if(hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
};

// уставливаем слушатели событий
// на инпуты по событию input вызываем функцию checkInputValidity
// которая проверяет валидны ли поля
const setEventListeners = (formElement, { submitButtonSelector, inputSelector, inputErrorClass, errorClass, inactiveButtonClass }) => {

  const submitButton = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  console.log(inputList);
   inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
    checkInputValidity (formElement, input, inputErrorClass, errorClass);
    toggleButtonState(submitButton, inactiveButtonClass, inputList);
    });
    });
}

// функция валидации полей (находим поля,
// вызываем фунцию навешивания слушателей) и
// передаем ей в качестве параметров нужные поля
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const enableValidation = ({formSelector, ...config}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners (formElement, config);
  });
}


enableValidation(validationConfig);
