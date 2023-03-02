// import {initialCardsExport} from './constans.js';

// popup
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupZoom = document.querySelector('.popup_zoom');
const popupImgZoom = document.querySelector('.popup__img_zoom');
const popupHeadingZoom = document.querySelector('.popup__heading_zoom');
// button popup open
const popupProfileEditButton = document.querySelector('.profile-info__edit-button');
const popupCardOpenButton = document.querySelector('.profile__add-button');
// popup close
const popupCloseEdit = document.querySelector('.popup__button-close-edit');
const popupCloseAdd = document.querySelector('.popup__button-close-add');
const popupCloseZoomImageButton = document.querySelector('.popup__button-close_image-zoom');
//elements
const cardSection = document.querySelector('.elements');
//переменная кнопки создания новой карточки
const formCreateCard = document.querySelector('.popup__content-add');
// const profilInfoName = document.querySelector('profile-info__title');
// const profilInfoJob = document.querySelector('profile-info__subtitle');
//переменная формы при сохранении измененных данных в profile
const formCard = document.querySelector('.popup__content-edit');
//находим поля формы в DOM
const nameInput = formCard.querySelector('.popup__input .popup__input-title-edit');
const jobInput = formCard.querySelector('.popup__input .popup__input-subtitle-edit');
//выберите элементы, куда должны быть вставлены значения полей
const profilInfoTitle = document.querySelector('.profile-info__title');
const profileInfoSubtitle = document.querySelector('.profile-info__subtitle');
// функция открытия и закрытия поп-апа
const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');
}
//открываем popup по клику на кнопку
//popup редактирования profile
popupProfileEditButton.addEventListener('click', function(){
  nameInput.value = profilInfoTitle.textContent;
  jobInput.value = profileInfoSubtitle.textContent;
  togglePopup(popupEditProfile);
});
//popup добавления новой карточки
popupCardOpenButton.addEventListener('click', function(){
  togglePopup(popupAddPlace);
});

// закрываем поп-ап по клику по кнопке
//popup редактирования profile
popupCloseEdit.addEventListener('click', closePopupEditProfile);

function closePopupEditProfile(){
  togglePopup(popupEditProfile);
};
//popup добавления новой карточки
popupCloseAdd.addEventListener('click', closePopupAddElement);

function closePopupAddElement(){
  togglePopup(popupAddPlace);
};
//popup с увеличенно картинкой
popupCloseZoomImageButton.addEventListener('click', closePopupimgZoom);

function closePopupimgZoom(){
  togglePopup(popupZoom);
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
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
formCard.addEventListener('submit', handleFormSubmit);

//добавляем элементы в секцию elements
const createCard = (card) => {
  const cardNew = document.querySelector('#elementTemplate').content.cloneNode(true);
  const cardName = cardNew.querySelector('.element__text');
  cardName.textContent = card.name;
  const cardImage = cardNew.querySelector('.element__img');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);
  // cardSection.prepend(cardNew);
  renderCard(cardNew, cardSection);
  const cardDeleteButton = document.querySelector('.element__delete_button');
  cardDeleteButton.addEventListener('click', deleteCard);
  const cardLikeButton = document.querySelector('.element__like_button');
  cardLikeButton.addEventListener('click', clickLikeAсtive);
  const cardClickImageZoom = document.querySelector('.element__img_zoom');
  cardClickImageZoom.addEventListener('click', createPopupImage);
};
const containerCard = initialCards.reverse();
containerCard.forEach(createCard);

function renderCard(card, container) {
  container.prepend(card);
}

//создаем новую карточку по событию submit
formCreateCard.addEventListener('submit', handleFormElementSubmit);
//функция создания новой карточки из данных в popup
function handleFormElementSubmit(event){
  event.preventDefault();
  const formCard = event.target;
  const nameElement = formCard.querySelector('.popup__input-title-add').value;
  const imageElement = formCard.querySelector('.popup__input-image-add').value;
  const anotherElement = {
    name: nameElement,
    alt: nameElement,
    link: imageElement
    }
    createCard(anotherElement);
    closePopupAddElement();
    event.target.reset();
 }

//функция удаления элемента
function deleteCard(event){
  event.target.closest('.element').remove();

}
 // like
function clickLikeAсtive(event){
  event.target.classList.toggle('element__like_active');
};
//передаем данные элемента в popup с картинкой и открываем его
function createPopupImage (event){
  popupImgZoom.src = event.target.src;
  popupImgZoom.alt = event.target.alt;
  popupHeadingZoom.textContent = popupImgZoom.alt;
  togglePopup(popupZoom);
};
