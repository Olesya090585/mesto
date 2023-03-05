// import {initialCardsExport} from './constans.js';

// popup
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
const popupZoom = document.querySelector(".popup_zoom");
const popupImgZoom = document.querySelector(".popup__img_zoom");
const popupHeadingZoom = document.querySelector(".popup__heading_zoom");
// button popup open
const popupProfileEditButton = document.querySelector(".profile-info__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");
// popup close
const popupCloseEdit = document.querySelector(".popup__button-close-edit");
const popupCloseAdd = document.querySelector(".popup__button-close-add");
const popupCloseZoomImageButton = document.querySelector(
  ".popup__button-close_image-zoom"
);
//elements
const cardSection = document.querySelector(".elements");
const cardTemplate = document.querySelector("#elementTemplate").content; // записываем в переменную cardTeplate шаблон карточки
//переменная кнопки создания новой карточки
const formCreateCard = document.querySelector(".popup__content-add");
const popupInputTitleAdd = formCreateCard.querySelector('.popup__input-title-add');
const popupInputImageAdd = formCreateCard.querySelector('.popup__input-image-add');
//переменная формы при сохранении измененных данных в profile
const formProfile = document.querySelector(".popup__content-edit");
//находим поля формы в DOM
const nameInput = formProfile.querySelector(".popup__input .popup__input-title-edit"
);
const jobInput = formProfile.querySelector(".popup__input .popup__input-subtitle-edit"
);
//выберите элементы, куда должны быть вставлены значения полей
const profilInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");
// функция открытия и закрытия поп-апа
const togglePopup = function (popup) {
  popup.classList.toggle("popup_opened");
};
//открываем popup по клику на кнопку
//popup редактирования profile
popupProfileEditButton.addEventListener("click", function () {
  nameInput.value = profilInfoTitle.textContent;
  jobInput.value = profileInfoSubtitle.textContent;
  togglePopup(popupEditProfile);
});
//popup добавления новой карточки
popupCardOpenButton.addEventListener("click", function () {
  togglePopup(popupAddPlace);
});

// закрываем поп-ап по клику по кнопке
//popup редактирования profile
popupCloseEdit.addEventListener("click", closePopupEditProfile);

function closePopupEditProfile() {
  togglePopup(popupEditProfile);
}
//popup добавления новой карточки
popupCloseAdd.addEventListener("click", closePopupAddElement);

function closePopupAddElement() {
  togglePopup(popupAddPlace);
}
//popup с увеличенно картинкой
popupCloseZoomImageButton.addEventListener("click", closePopupimgZoom);

function closePopupimgZoom() {
  togglePopup(popupZoom);
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

//создаем новую карточку
const createCard = (card) => {
  const cardNew = cardTemplate.cloneNode(true);
  const cardName = cardNew.querySelector(".element__text");
  cardName.textContent = card.name;
  const cardImage = cardNew.querySelector(".element__img");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.alt);
  const cardDeleteButton = cardNew.querySelector(".element__delete_button"); // ищем кнопку не по всему документу, а внутри cardNew - это копия шаблона со всем содержимым карточки - нужно обращатсья к нему
  cardDeleteButton.addEventListener("click", deleteCard);
  const cardLikeButton = cardNew.querySelector(".element__like_button"); // ищем кнопку не по всему документу, а внутри cardNew - это копия шаблона со всем содержимым карточки - нужно обращатсья к нему
  cardLikeButton.addEventListener("click", clickLikeAсtive);
  const cardClickImageZoom = cardNew.querySelector(".element__img_zoom"); // ищем кнопку не по всему документу, а внутри cardNew - это копия шаблона со всем содержимым карточки - нужно обращатсья к нему
  cardClickImageZoom.addEventListener("click", createPopupImage);
  return cardNew;
};
////добавляем карточку на страницу
const addCard = (card) => {
  cardSection.prepend(createCard(card));
};
//переворачиваем массив и проходим по нему функцией addCard
initialCards.reverse().forEach(addCard);
//создаем новую карточку по событию submit
formCreateCard.addEventListener("submit", handleFormElementSubmit);
//функция создания новой карточки из данных в popup
function handleFormElementSubmit(event) {
  event.preventDefault();
  const nameElement = formCreateCard.querySelector(".popup__input-title-add").value;
  const imageElement = formCreateCard.querySelector(".popup__input-image-add").value;
  const anotherElement = {
    name: nameElement,
    alt: nameElement,
    link: imageElement,
  };
  // createCard(anotherElement);
  addCard(anotherElement);
  closePopupAddElement();
  popupInputTitleAdd.value = '';
  popupInputImageAdd.value = '';
}

//функция удаления элемента
function deleteCard(event) {
  event.target.closest(".element").remove();
}
// like
function clickLikeAсtive(event) {
  event.target.classList.toggle("element__like_active");
}
//передаем данные элемента в popup с картинкой и открываем его
function createPopupImage(event) {
  popupImgZoom.src = event.target.src;
  popupImgZoom.alt = event.target.alt;
  popupHeadingZoom.textContent = popupImgZoom.alt;
  togglePopup(popupZoom);
}
