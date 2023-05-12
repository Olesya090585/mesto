export class Card {
  constructor(
    data,
    cardTemplate,
    userId,
    { handleCardClick },
    { handleDeleteIconClick },
    { handleLikeIconClick }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this.cardTemplate = cardTemplate;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeIconClick = handleLikeIconClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this.cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  _addLikeCard() {
    this._cardLikeButton.classList.add("element__like_active");
  }

  _removeLikeCard() {
    this._cardLikeButton.classList.remove("element__like_active");
  }

  setCardLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountCard.textContent = this._likes.length;

    if (this.isLiked()) {
      this._addLikeCard();
    } else this._removeLikeCard();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIconClick(this._cardId);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this._cardId);
      console.log(this._cardId);
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
    this._likeCountCard = this._element.querySelector(".element__counter-like");

    if (this._ownerId != this._userId) {
      this._cardDeleteButton.remove();
    }

    this._cardClickImageZoom =
      this._element.querySelector(".element__img_zoom");
    this.setCardLikes(this._likes);

    this._setEventListeners();

    return this._element;
  }
}
