export class Card {
  constructor(cardData, cardTemplate, { handleCardClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._handleCardClick = handleCardClick;
    this.cardTemplate = cardTemplate;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this.cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    this._cardLikeButton.classList.toggle("element__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardClickImageZoom.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
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
