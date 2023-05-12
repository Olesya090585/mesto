import "./index.css";
import { Card } from "../components/Card.js";
import { validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";
import { UserInfo } from "../components/UserInfo.js";

import { Api } from "../utils/Api.js";

import {
  popupProfileEditButton,
  popupCardOpenButton,
  profileInfoTitle,
  profileInfoSubtitle,
  profileAvatar,
  formCreateCard,
  formProfile,
  formUpdateAvatar,
  nameInput,
  jobInput,
} from "../utils/constants.js";

let userId;

// создаем экземпляры классов
// валидация
const validatorPopupEdit = new FormValidator(formProfile, validationConfig);
validatorPopupEdit.enableValidation();

const validatorPopupPlace = new FormValidator(formCreateCard, validationConfig);
validatorPopupPlace.enableValidation();

const validatorPopupAvatar = new FormValidator(
  formUpdateAvatar,
  validationConfig
);

//popup
const popupZoomImage = new PopupWithImage(".popup_zoom");
const popupCard = new PopupWithForm(
  ".popup_add-place",
  handleFormSubmitAddCard
);
const popupConfirmation = new PopupWithSubmit(".popup_confirmation");
const popupProfile = new PopupWithForm(
  ".popup_edit-profile",
  handleSubmitFormEditProfile
);
const popupAvatar = new PopupWithForm(
  ".popup_update-avatar",
  handleSubmitFormUpdateAvatar
);
validatorPopupAvatar.enableValidation();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "a5c49dba-7825-4f64-810e-0dbcf5a9822d",
    "Content-Type": "application/json",
  },
});

//функция создания новой карточки

function createCard(data) {
  const newCard = new Card(
    data,
    "#elementTemplate",
    userId,
    {
      handleCardClick: (name, link) => {
        popupZoomImage.open(name, link);
      },
    },
    {
      handleDeleteIconClick: (cardId) => {
        console.log(cardId);
        const submitCardDelete = async () => {
          try {
            const res = await api.deleteCard(cardId);
            console.log(res);
            newCard.deleteCard();
            popupConfirmation.close();
          } catch (error) {
            return console.log(`Ошибка: ${error}`);
          }
        };

        popupConfirmation.open();
        popupConfirmation.setSubmitAction(submitCardDelete);
      },
    },
    {
      handleLikeIconClick: (cardId) => {
        if (newCard.isLiked()) {
          api
            .deleteLikeCard(cardId)
            .then((res) => {
              newCard.setCardLikes(res.likes);
            })
            .catch((err) => {
              console.error(`Ошибка: ${err}`);
            });
        } else {
          api
            .addLikeCard(cardId)
            .then((res) => {
              newCard.setCardLikes(res.likes);
            })
            .catch((err) => {
              console.error(`Ошибка: ${err}`);
            });
        }
      },
    }
  );
  return newCard.generateCard();
}

// создаем экземпляр класс Section
const cardSection = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardSection.addItem(card);
    },
  },
  ".elements"
);

// функция добавления карточек
async function handleFormSubmitAddCard(data) {
  try {
    popupCard.checkLoading(true);
    const newCard = await api.addNewCard(data);
    cardSection.addItem(createCard(newCard));
    popupCard.close();
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  } finally {
    popupCard.checkLoading(false);
  }
}

const openPopupCard = () => {
  popupCard.open();
  validatorPopupPlace.disableButton();
};

//popup добавления новой карточки
popupCardOpenButton.addEventListener("click", openPopupCard);

const userInfo = new UserInfo({
  name: ".profile-info__title",
  about: ".profile-info__subtitle",
  avatar: ".profile-info__avatar",
});

async function handleSubmitFormEditProfile(data) {
  try {
    popupProfile.checkLoading(true);
    const userData = await api.editUserInfo(data);
    userInfo.setUserInfo(userData);
    popupProfile.close();
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  } finally {
    popupProfile.checkLoading(false);
  }
}

async function handleSubmitFormUpdateAvatar(data) {
  try {
    popupAvatar.checkLoading(true);
    const newAvatar = await api.updateAvatar(data);
    userInfo.setUserInfo(newAvatar);
    popupAvatar.close();
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  } finally {
    popupAvatar.checkLoading(false);
  }
}

// Отoбражение карточек с сервера и данных пользователя
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, newCard]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardSection.renderItems(newCard);
  })
  .catch((error) => console.log(`Ошибка: ${error})`));

// popup данных поьзователя
popupProfileEditButton.addEventListener("click", function () {
  const dataUserInfo = userInfo.getUserInfo();
  nameInput.value = dataUserInfo.userName;
  jobInput.value = dataUserInfo.userAbout;
  popupProfile.open();
  validatorPopupEdit.disableButton();
});

// popup смены аватара
profileAvatar.addEventListener("click", function () {
  popupAvatar.open();
  validatorPopupEdit.disableButton();
});

//навешиваем слушатели
popupCard.setEventListeners();
popupZoomImage.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();
popupConfirmation.setEventListeners();
