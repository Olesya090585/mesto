

export class Card {
  constructor(data, cardTemplate, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._handleOpenPopup = handleOpenPopup;
    this.cardTemplate = cardTemplate;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this.cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _clickLikeAсtive() {
    this._cardLikeButton.classList.toggle("element__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._clickLikeAсtive();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardClickImageZoom.addEventListener("click", () => {
      // this._openPopupImage();
      this._handleOpenPopup(this._link, this._alt, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__img");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardName = this._element.querySelector(".element__text");
    this._cardName.textContent = this._name;
    this._cardLikeButton = this._element.querySelector(".element__like_button");
    this._cardDeleteButton = this._element.querySelector(
      ".element__delete_button"
    );
    this._cardClickImageZoom =
      this._element.querySelector(".element__img_zoom");

    this._setEventListeners();

    return this._element;
  }
}
