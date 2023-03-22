
// popup
const overlay = document.querySelector('.popup');
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddPlace = document.querySelector(".popup_add-place");
const popupZoom = document.querySelector(".popup_zoom");
const popupImgZoom = document.querySelector(".popup__img_zoom");
const popupHeadingZoom = document.querySelector(".popup__heading_zoom");
const popupInputError = document.querySelectorAll('.popup__input-text_error');
// button popup open
const popupProfileEditButton = document.querySelector(".profile-info__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");
// popup close
const popupCloseEdit = document.querySelector(".popup__button-close-edit");
const popupCloseAdd = document.querySelector(".popup__button-close-add");
const popupCloseZoomImageButton = document.querySelector(".popup__button-close_image-zoom");
//elements
const cardSection = document.querySelector(".elements");
const cardTemplate = document.querySelector("#elementTemplate").content; // записываем в переменную cardTeplate шаблон карточки
//переменная кнопки создания новой карточки
const formCreateCard = document.querySelector(".popup__content-add");
const popupInputTitleAdd = formCreateCard.querySelector('.popup__input-title-add');
const popupInputImageAdd = formCreateCard.querySelector('.popup__input-image-add');
const buttonAddPlace = formCreateCard.querySelector(".popup__button-save-add");
//переменная формы при сохранении измененных данных в profile
const formProfile = document.querySelector(".popup__content-edit");
//находим поля формы в DOM
const nameInput = formProfile.querySelector(".popup__input .popup__input-title-edit");
const jobInput = formProfile.querySelector(".popup__input .popup__input-subtitle-edit");
//выберите элементы, куда должны быть вставлены значения полей
const profilInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

//закрываем popup кликом по оверлэй
const closePopupClickOverlay = (overlay) =>{
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup(overlay);
    }
  });
  }

  //убираем закрытие popup кликом по оверлэй
const deleteClosePopupClickOverlay = (overlay) =>{
  overlay.removeEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup(overlay);
    }
  });
  }

  //закрываем popup кликом на Esc
  const closePopupEscape = (overlay) => {
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closePopup(overlay);
    }
  });
  }

   //убираем закрытие popup кликом на Esc
   const deleteClosePopupEscape = (overlay) => {
    document.removeEventListener('keydown', (e) => {
      if (e.code === "Escape") {
        closePopup(overlay);
      }
    });
    }

// функция открытия popup
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  closePopupEscape (popup);
  closePopupClickOverlay(popup);
};

// функция закрытия popup
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  deleteClosePopupEscape (popup);
  deleteClosePopupClickOverlay(popup);
};
//открываем popup по клику на кнопку
//popup редактирования profile
popupProfileEditButton.addEventListener("click", function () {
  nameInput.value = profilInfoTitle.textContent;
  jobInput.value = profileInfoSubtitle.textContent;
  openPopup(popupEditProfile);
});
//popup добавления новой карточки

popupCardOpenButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
  buttonAddPlace.classList.add("popup__button-save_disabled");
  buttonAddPlace.setAttribute('disabled', '');
});


// закрываем поп-ап по клику по кнопке
//popup редактирования profile
popupCloseEdit.addEventListener("click", closePopupEditProfile);

function closePopupEditProfile() {
  closePopup(popupEditProfile);
}
//popup добавления новой карточки
popupCloseAdd.addEventListener("click", closePopupAddElement);

function closePopupAddElement(validationConfig) {
  closePopup(popupAddPlace);
  popupInputTitleAdd.value = '';
  popupInputImageAdd.value = '';
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
  event.target.reset();
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
  openPopup(popupZoom);
}


