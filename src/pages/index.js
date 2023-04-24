import './index.css';
import { Card } from "../components/card.js";
import { initialCards, config } from "../components/constants.js";
import { FormValidator } from "../components/formvalidator.js";
import { Section } from "../components/Section.js";
// import { Popup } from "./Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UzerInfo.js";

// popup
const popupProfileEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const popupCardOpenButton = document.querySelector(".profile__add-button");
// profile
const profilInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");
//form
const formCreateCard = document.querySelector(".popup__content-add");
const formProfile = document.querySelector(".popup__content-edit");
const nameInput = formProfile.querySelector(
  ".popup__input .popup__input-title-edit"
);
const jobInput = formProfile.querySelector(
  ".popup__input .popup__input-subtitle-edit"
);

// валидация
const validatorPopupEdit = new FormValidator(formProfile, config);
validatorPopupEdit.enableValidation();

const validatorPopupPlace = new FormValidator(formCreateCard, config);
validatorPopupPlace.enableValidation();

// навешиваем слушатели на кнопки открытия popup

// popup данных поьзователя
popupProfileEditButton.addEventListener("click", function () {
  nameInput.value = profilInfoTitle.textContent;
  jobInput.value = profileInfoSubtitle.textContent;
  popupProfile.open();
  validatorPopupEdit.disableButton();
});

//popup добавления новой карточки
popupCardOpenButton.addEventListener("click", function () {
  popupCard.open();
  validatorPopupPlace.disableButton();
  formCreateCard.reset();
});

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

function createCard(items) {
  const newCard = new Card(items, "#elementTemplate", {
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

//навешиваем слушатели
popupCard.setEventListeners();
popupZoomImage.setEventListeners();
popupProfile.setEventListeners();
