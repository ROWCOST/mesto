const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupPlace = document.querySelector('.popup_type_new-place');
const popupImageView = document.querySelector('.popup_type_image');

const popupImage = popupImageView.querySelector('.popup__image');
const popupImageCaption = popupImageView.querySelector('.popup__image-caption');

const nameInput = document.querySelector('.popup__input_content_name-field');
const jobInput = document.querySelector('.popup__input_content_job-field');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');

const placeName = popupPlace.querySelector('.popup__input_content_place-name');
const imageUrl = popupPlace.querySelector('.popup__input_content_image-url');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditProfileSubmit = popupProfileEdit.querySelector('.popup__save-button');

const buttonAddPlace = document.querySelector('.profile__add-button');
const buttonAddPlaceSubmit = popupPlace.querySelector('.popup__save-button');

const formEdit = document.forms['profile_edit'];
const formPlace = document.forms['new-place'];

const popups = document.querySelectorAll('.popup');
const popupInputFields = document.querySelectorAll('.popup__input');
const errorMessages = document.querySelectorAll('.popup__form-input-error');

const cardTemplate = document.querySelector('#elementTemplate').content;
const cardsContainer = document.querySelector('.elements__table');

function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeOnEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

function openEditPopup() {
  openPopup(popupProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  enableSubmitButton(buttonEditProfileSubmit, validateSettings);
  disableErrorMessages(errorMessages);
}

function openPlacePopup() {
  openPopup(popupPlace);
  formPlace.reset();
  disableSubmitButton(buttonAddPlaceSubmit, validateSettings);
  disableErrorMessages(errorMessages);
}

function openImage(image, caption) {
  openPopup(popupImageView);
  popupImage.src = image;
  popupImage.alt = `?????????????????????? ${caption}`;
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
  renderCard(placeName.value, imageUrl.value);
  closePopup(popupPlace);
}

const initialCards = [
  {
    name: '??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: '?????????????????????? ??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: '??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: '????????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: '???????????????????????? ??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: '????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  const cardRemoveButton = cardElement.querySelector('.element__remove-button');
  const likeButton = cardElement.querySelector('.element__like-button');

  cardElementImage.src = link;
  cardElementImage.alt = `?????????????????????? ${name}`;
  cardElement.querySelector('.element__title').textContent = name;

  cardElementImage.addEventListener('click', () => openImage(link, name));
  cardRemoveButton.addEventListener('click', () => cardElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

  return cardElement;
}

function renderCard(name, link) {
  const cardElement = createCard(name, link);
  cardsContainer.prepend(cardElement);
}

buttonEditProfile.addEventListener('click', openEditPopup);
buttonAddPlace.addEventListener('click', openPlacePopup);

formEdit.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);

initialCards.forEach((item) => renderCard(item.name, item.link));