
const profileInfoEditButton = document.querySelector('.profile-info__edit-button');
const editPopupOpen = document.querySelector('.popup');
const editPopupClose = document.querySelector('.popup__button-close');

// открыть поп-ап

profileInfoEditButton.addEventListener('click', openPopup)

function openPopup(){
    editPopupOpen.classList.add('popup_opened');
}

//закрыть поп-ап

editPopupClose.addEventListener('click', closePopup)

function closePopup(){
    editPopupOpen.classList.remove('popup_opened');
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__content');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input .popup__input-title');
let jobInput = formElement.querySelector('.popup__input .popup__input-subtitle');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
 // Получите значение полей jobInput и nameInput из свойства value                                               // О том, как это делать, расскажем позже.
let nameInputValue = nameInput.value;
let jobInputValue = jobInput.value;
// Выберите элементы, куда должны быть вставлены значения полей
let profilInfoTitle = document.querySelector('.profile-info__title');
let profileInfoSubtitle = document.querySelector('.profile-info__subtitle');

// Вставьте новые значения с помощью textContent
profilInfoTitle.textContent = nameInputValue;
profileInfoSubtitle.textContent = jobInputValue;

closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

