import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
};

const popupProfileEdit = document.querySelector(".popup_type_profile-edit");
const popupPlace = document.querySelector(".popup_type_new-place");
const popupImageView = document.querySelector(".popup_type_image");

const popupImage = popupImageView.querySelector(".popup__image");
const popupImageCaption = popupImageView.querySelector(".popup__image-caption");

const nameInput = document.querySelector(".popup__input_content_name-field");
const jobInput = document.querySelector(".popup__input_content_job-field");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");

const placeName = popupPlace.querySelector(".popup__input_content_place-name");
const imageUrl = popupPlace.querySelector(".popup__input_content_image-url");

const buttonEditProfile = document.querySelector(".profile__edit-button");

const buttonAddPlace = document.querySelector(".profile__add-button");

const formEdit = document.forms["profile_edit"];
const formPlace = document.forms["new-place"];

const popups = document.querySelectorAll(".popup");

const cardsContainer = document.querySelector(".elements__table");

function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeOnEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_active") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

function openEditPopup() {
  openPopup(popupProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editProfileFormValidator.enableValidation();
}

function openPlacePopup() {
  openPopup(popupPlace);
  formPlace.reset();
  addPlaceFormValidator.enableValidation();
}

function openImage(image, caption) {
  openPopup(popupImageView);
  popupImage.src = image;
  popupImage.alt = `Изображение ${caption}`;
  popupImageCaption.textContent = caption;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({ name: placeName.value, link: imageUrl.value }));
  evt.target.reset();
  closePopup(popupPlace);
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(item) {
  const cardElement = new Card(item, "#elementTemplate", openImage).setData();

  return cardElement;
}

initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.prepend(card);
});

buttonEditProfile.addEventListener("click", openEditPopup);
buttonAddPlace.addEventListener("click", openPlacePopup);

formEdit.addEventListener("submit", handleProfileFormSubmit);
formPlace.addEventListener("submit", handlePlaceFormSubmit);

const editProfileFormValidator = new FormValidator(validateSettings, popupProfileEdit);
const addPlaceFormValidator = new FormValidator(validateSettings, popupPlace);