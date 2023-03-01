<<<<<<< HEAD

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
    nameInput.value = profilInfoName.textContent;
    jobInput.value = profileInfoJob.textContent;
=======
// popup
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupZoom = document.querySelector('.popup_zoom');
const popupImgZoom = document.querySelector('.popup__img_zoom');
const popupHeadingZoom = document.querySelector('.popup__heading_zoom');
// button popup open
const profileInfoEditButton = document.querySelector('.profile-info__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
// popup close
const editPopupClose = document.querySelector('.popup__button-close-edit');
const addPopupClose = document.querySelector('.popup__button-close-add');
const zoomPopupClose = document.querySelector('.popup__button-close_image-zoom');
//elements
const elementsSection = document.querySelector('.elements');
//переменная кнопки создания новой карточки
const formCreateElement = document.querySelector('.popup__content-add');
//переменная формы при сохранении измененных данных в profile
const formElement = document.querySelector('.popup__content-edit');
//находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input .popup__input-title-edit');
let jobInput = formElement.querySelector('.popup__input .popup__input-subtitle-edit');
//массив карточек
const initialCards = [
  {
    name: 'Архыз',
    alt: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    alt: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    alt: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    alt: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    alt: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    alt: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// функция открытия и закрытия поп-апа
const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');
>>>>>>> develop
}
//открываем popup по клику на кнопку
//popup редактирования profile
profileInfoEditButton.addEventListener('click', function(){
  togglePopup(popupEditProfile);
});
//popup добавления новой карточки
addPlaceButton.addEventListener('click', function(){
  togglePopup(popupAddPlace);
});

<<<<<<< HEAD
function closePopup(){
    editPopupOpen.classList.remove('popup_opened');
}

=======
// закрываем поп-ап по клику по кнопке
//popup редактирования profile
editPopupClose.addEventListener('click', closePopupEditProfile);

function closePopupEditProfile(){
  togglePopup(popupEditProfile);
};
//popup добавления новой карточки
addPopupClose.addEventListener('click', closePopupAddElement);

function closePopupAddElement(){
  togglePopup(popupAddPlace);
};
//popup с увеличенно картинкой
zoomPopupClose.addEventListener('click', closePopupimgZoom);

function closePopupimgZoom(){
  togglePopup(popupZoom);
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
>>>>>>> develop
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // Получите значение полей jobInput и nameInput из свойства value                                               // О том, как это делать, расскажем позже.
let nameInputValue = nameInput.value;
let jobInputValue = jobInput.value;
<<<<<<< HEAD

// Вставьте новые значения с помощью textContent
profilInfoName.textContent = nameInputValue;
profileInfoJob.textContent = jobInputValue;

closePopup();
}

//добавление обработчиков (слушателей)

profileInfoEditButton.addEventListener('click', openPopup);

editPopupClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);


=======
//выберите элементы, куда должны быть вставлены значения полей
let profilInfoTitle = document.querySelector('.profile-info__title');
let profileInfoSubtitle = document.querySelector('.profile-info__subtitle');
//вставьте новые значения с помощью textContent
profilInfoTitle.textContent = nameInputValue;
profileInfoSubtitle.textContent = jobInputValue;
closePopupEditProfile();
}
//прикрепляем обработчик к форме:
//он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//добавляем элементы в секцию elements
const createElement = (card) => {
  const elementNew = document.querySelector('#elementTemplate').content.cloneNode(true);
  const elementName = elementNew.querySelector('.element__text');
  elementName.textContent = card.name;
  const elementImage = elementNew.querySelector('.element__img');
  elementImage.setAttribute('src', card.link);
  elementImage.setAttribute('alt', card.alt);
  elementsSection.prepend(elementNew);
  const deleteElementButton = document.querySelector('.element__delete_button');
  deleteElementButton.addEventListener('click', deleteElement);
  const elementLikeButton = document.querySelector('.element__like_button');
  elementLikeButton.addEventListener('click', clickLikeAсtive);
  const clickElementImgZoom = document.querySelector('.element__img_zoom');
  clickElementImgZoom.addEventListener('click', createPopupImage);
};
const containerElement = initialCards.reverse();
containerElement.forEach(createElement);

//создаем новую карточку по событию submit
formCreateElement.addEventListener('submit', handleFormElementSubmit);
//функция создания новой карточки из данных в popup
function handleFormElementSubmit(event){
  event.preventDefault();
  const formElement = event.target;
  const nameElement = formElement.querySelector('.popup__input-title-add').value;
  const imageElement = formElement.querySelector('.popup__input-image-add').value;
  const anotherElement = {
    name: nameElement,
    alt: nameElement,
    link: imageElement
    }
    createElement(anotherElement);
    closePopupAddElement();
 }

//функция удаления элемента
function deleteElement(event){
  event.target.parentElement.remove();
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
>>>>>>> develop
