import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImgZoom = this._popupElement.querySelector(".popup__img_zoom");
    this._popupHeadingZoom = this._popupElement.querySelector(
      ".popup__heading_zoom"
    );
  }

  open(name, link) {
    this._popupHeadingZoom.textContent = name;
    this._popupImgZoom.src = link;
    this._popupImgZoom.alt = name;
    super.open();
  }
}
