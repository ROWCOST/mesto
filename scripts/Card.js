export class Card {
  constructor(item, templateSelector, openImage) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  _getTemplate() {
    const cardElements = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElements;
  }

  _handleImageClick() {
    this._openImage(this._link, this._name);
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _toggleLike() {
    this._likeButton.classList.toggle("element__like-button_active")
  }

  _setEventListeners() {
    this._cardElementImage = this._cardElement.querySelector(".element__image");
    this._cardRemoveButton = this._cardElement.querySelector(".element__remove-button");
    this._likeButton = this._cardElement.querySelector(".element__like-button");
    
    this._cardElementImage.addEventListener("click", () => this._handleImageClick());
    this._cardRemoveButton.addEventListener("click", () => this._deleteCard());
    this._likeButton.addEventListener("click", () => this._toggleLike());
  }

  setData() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = `Изображение ${this._name}`;
    this._cardElement.querySelector('.element__title').textContent = this._name;

    return this._cardElement;
  }
}