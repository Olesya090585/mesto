
//объявляем все переменные

const profileInfoEditButton = document.querySelector('.profile-info__edit-button');
const editPopupOpen = document.querySelector('.popup');
const editPopupClose = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__content');
const nameInput = formElement.querySelector('.popup__group .popup__input_text_name');
const jobInput = formElement.querySelector('.popup__group .popup__input_text_job');
const profilInfoName = document.querySelector('.profile-info__name');
const profileInfoJob = document.querySelector('.profile-info__job');

// функции

function openPopup(){
    editPopupOpen.classList.add('popup_opened');
    nameInput.textContent = profilInfoName;
    jobInput.textContent = profileInfoJob;
}

function closePopup(){
    editPopupOpen.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
 // Получите значение полей jobInput и nameInput из свойства value                                               // О том, как это делать, расскажем позже.
let nameInputValue = nameInput.value;
let jobInputValue = jobInput.value;

// Вставьте новые значения с помощью textContent
profilInfoName.textContent = nameInputValue;
profileInfoJob.textContent = jobInputValue;

closePopup();
}

//добавление обработчиков (слушателей)

profileInfoEditButton.addEventListener('click', openPopup)

editPopupClose.addEventListener('click', closePopup)

formElement.addEventListener('submit', handleFormSubmit);


