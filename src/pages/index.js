import "./index.css";
import { Card } from "../components/Card.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
// import { Popup } from "./Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  popupProfileEditButton,
  popupCardOpenButton,
  profileInfoTitle,
  profileInfoSubtitle,
  formCreateCard,
  formProfile,
  nameInput,
  jobInput,
} from "../utils/constants.js";

// валидация
const validatorPopupEdit = new FormValidator(formProfile, validationConfig);
validatorPopupEdit.enableValidation();

const validatorPopupPlace = new FormValidator(formCreateCard, validationConfig);
validatorPopupPlace.enableValidation();

// создаем экземпляры классов
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".elements"
);

cardSection.renderItems(initialCards);

function createCard(cardData) {
  const newCard = new Card(cardData, "#elementTemplate", {
    handleCardClick: (name, link) => {
      popupZoomImage.open(name, link);
    },
  });
  return newCard.generateCard();
}

const popupZoomImage = new PopupWithImage(".popup_zoom");

const popupCard = new PopupWithForm(".popup_add-place", {
  handleFormSubmit: (item) => {
    console.log(item);
    cardSection.addItem(createCard({ name: item.title, link: item.image }));
  },
});

const userInfo = new UserInfo(
  ".profile-info__title",
  ".profile-info__subtitle"
);

const popupProfile = new PopupWithForm(".popup_edit-profile", {
  handleFormSubmit: (item) => {
    userInfo.setUserInfo({ name: item.name, job: item.job });
  },
});

const openPopupCard = () => {
  popupCard.open();
  validatorPopupPlace.disableButton();
}


//popup добавления новой карточки
popupCardOpenButton.addEventListener("click", openPopupCard);


// popup данных поьзователя
popupProfileEditButton.addEventListener("click", function () {
  const dataUserInfo =  userInfo.getUserInfo();
  nameInput.value = dataUserInfo.name;
  jobInput.value = dataUserInfo.job;
  popupProfile.open();
  validatorPopupEdit.disableButton();
});

//навешиваем слушатели
popupCard.setEventListeners();
popupZoomImage.setEventListeners();
popupProfile.setEventListeners();
