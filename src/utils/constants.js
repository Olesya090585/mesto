
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: ".popup__input-error_type_",
  errorClass: "popup__error_visible",
};

// popup
const popupProfileEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const popupCardOpenButton = document.querySelector(".profile__add-button");
// profile
const profileInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");
const profileAvatar = document.querySelector(".profile-info__pencil");
//form
const formCreateCard = document.querySelector(".popup__content-add");
const formProfile = document.querySelector(".popup__content-edit");
const formUpdateAvatar = document.querySelector(".popup__content-avatar");
const nameInput = formProfile.querySelector(
  ".popup__input .popup__input-title-edit"
);
const jobInput = formProfile.querySelector(
  ".popup__input .popup__input-subtitle-edit"
);

export {
  popupProfileEditButton,
  popupCardOpenButton,
  profileInfoTitle,
  profileInfoSubtitle,
  profileAvatar,
  formCreateCard,
  formProfile,
  formUpdateAvatar,
  nameInput,
  jobInput
};
