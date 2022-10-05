const POPUP_ACTIVE_CLASS = 'popup_active';

const openPopupBtn = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupContent = popup.querySelector('.popup__container');
const form = popup.querySelector('.popup__form');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_content_name');
const jobInput = document.querySelector('.popup__input_content_job');

const closePopupBtn = popup.querySelector('.popup__close-button');

openPopupBtn.addEventListener("click", () => {
    popup.classList.add(POPUP_ACTIVE_CLASS);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

popup.addEventListener("click", (event) => {
    if (!popupContent.contains(event.target) || event.target === closePopupBtn) {
        popup.classList.remove(POPUP_ACTIVE_CLASS);
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log('HI');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove(POPUP_ACTIVE_CLASS);
});