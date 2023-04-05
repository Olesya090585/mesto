import { Card } from "./card.js";
import { initialCards, config } from "./constants.js";
import { FormValidator } from "./formvalidator.js";

// popup
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
const popupZoom = document.querySelector(".popup_zoom");
const popupImgZoom = document.querySelector(".popup__img_zoom");
const popupHeadingZoom = document.querySelector(".popup__heading_zoom");
// button popup open
const popupProfileEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const popupCardOpenButton = document.querySelector(".profile__add-button");
// popup close
const popupCloseEdit = document.querySelector(".popup__button-close-edit");
const popupCloseAdd = document.querySelector(".popup__button-close-add");
const popupCloseZoomImageButton = document.querySelector(
  ".popup__button-close_image-zoom"
);
//elements
const cardSection = document.querySelector(".elements");
//переменная кнопки создания новой карточки
const formCreateCard = document.querySelector(".popup__content-add");
const popupInputTitleAdd = formCreateCard.querySelector(
  ".popup__input-title-add"
);
const popupInputImageAdd = formCreateCard.querySelector(
  ".popup__input-image-add"
);
//переменная формы при сохранении измененных данных в profile
const formProfile = document.querySelector(".popup__content-edit");
//находим поля формы в DOM
const nameInput = formProfile.querySelector(
  ".popup__input .popup__input-title-edit"
);
const jobInput = formProfile.querySelector(
  ".popup__input .popup__input-subtitle-edit"
);
//выберите элементы, куда должны быть вставлены значения полей
const profilInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

// функция закрытия по клику на overlay
const closeOnClickOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};
// функция закрытия по Escape
const closePopupEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// функция открытия popup
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
  popup.addEventListener("click", closeOnClickOverlay);
};

// функция закрытия popup
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
  popup.removeEventListener("click", closeOnClickOverlay);
};

//открываем popup по клику на кнопку
//popup редактирования profile
popupProfileEditButton.addEventListener("click", function () {
  nameInput.value = profilInfoTitle.textContent;
  jobInput.value = profileInfoSubtitle.textContent;
  openPopup(popupEditProfile);
  validatorPopupEdit.disableButton();
});

const validatorPopupEdit = new FormValidator(formProfile, config);
validatorPopupEdit.enableValidation();

const validatorPopupPlace = new FormValidator(formCreateCard, config);
validatorPopupPlace.enableValidation();

//popup добавления новой карточки
popupCardOpenButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
  validatorPopupPlace.disableButton();
  formCreateCard.reset();
});

// закрываем поп-ап по клику по кнопке
//popup редактирования profile
popupCloseEdit.addEventListener("click", closePopupEditProfile);

function closePopupEditProfile() {
  closePopup(popupEditProfile);
}
//popup добавления новой карточки
popupCloseAdd.addEventListener("click", closePopupAddElement);

function closePopupAddElement() {
  closePopup(popupAddPlace);
}
//popup с увеличенной картинкой
popupCloseZoomImageButton.addEventListener("click", closePopupimgZoom);

function closePopupimgZoom() {
  closePopup(popupZoom);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // Получите значение полей jobInput и nameInput из свойства value                                               // О том, как это делать, расскажем позже.
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  //вставьте новые значения с помощью textContent
  profilInfoTitle.textContent = nameInputValue;
  profileInfoSubtitle.textContent = jobInputValue;
  closePopupEditProfile();
}
//прикрепляем обработчик к форме:
//он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleFormProfileSubmit);

//добавляем карточку на страницу
function addCard(initialCards) {
  // Создадим экземпляр карточки
  const newCard = new Card(initialCards, "#elementTemplate", handleOpenPopup);
  // Создаём карточку и возвращаем наружу
  cardSection.prepend(newCard.generateCard());
}

//переворачиваем массив и проходим по нему функцией addCard
initialCards.forEach(addCard);

//создаем новую карточку по событию submit
formCreateCard.addEventListener("submit", handleFormElementSubmit);

//функция создания новой карточки из данных в popup
function handleFormElementSubmit(event) {
  event.preventDefault();
  const nameElement = popupInputTitleAdd.value;
  const imageElement = popupInputImageAdd.value;
  const anotherElement = {
    name: nameElement,
    alt: nameElement,
    link: imageElement,
  };
  // createCard(anotherElement);
  addCard(anotherElement);
  closePopupAddElement();
}

function handleOpenPopup(link, alt, name){
  popupImgZoom.src = link;
  popupImgZoom.alt = alt;
  popupHeadingZoom.textContent = name;
  openPopup(popupZoom);
}


export { popupZoom, popupImgZoom, popupHeadingZoom, openPopup };
