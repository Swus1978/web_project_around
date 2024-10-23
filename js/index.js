const overlay = document.getElementById('overlay');

const togglePopup = (popup) => {
    const isOpen = popup.classList.toggle('popup--open');
    overlay.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
};

const createCard = (title, imageUrl, cardGrid) => {
    const card = document.createElement('div');
    card.className = 'card-section__card';

    const img = document.createElement('img');
    img.className = 'card-section__card-img';
    img.src = imageUrl;
    img.alt = title;
    img.dataset.imageSrc = imageUrl;
    img.addEventListener('click', () => {
        createImageViewerPopup(imageUrl, title);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'card-section__button card-section__button-delete';
    deleteButton.innerHTML = '<img src="./svg/Trash.svg" alt="Delete" title="Delete">';
    deleteButton.addEventListener('click', () => {
        card.classList.add('card-section__card--removing');
        card.addEventListener('transitionend', () => {
            card.remove();
        }, { once: true });
    });

    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-section__card-title';
    cardTitle.textContent = title;

    const likeButton = document.createElement('button');
    likeButton.className = 'card-section__button card-section__button-like';
    likeButton.title = 'Like';
    likeButton.addEventListener('click', (e) => {
        e.target.classList.toggle('card-section__button-like--active');
    });

    card.appendChild(img);
    card.appendChild(deleteButton);
    card.appendChild(cardTitle);
    card.appendChild(likeButton);
    cardGrid.appendChild(card);
};

const initializeCards = (initialCards, cardGrid) => {
    initialCards.forEach(card => createCard(card.name, card.link, cardGrid));
};

const handleEditProfile = (editProfileButton, closeEditPopupButton, editPopup, editForm, authorTitle, authorText) => {
    editProfileButton.addEventListener('click', () => {
        editForm.querySelector('input[name="name"]').value = authorTitle.textContent;
        editForm.querySelector('input[name="text"]').value = authorText.textContent;
        togglePopup(editPopup);
    });

    closeEditPopupButton.addEventListener('click', () => togglePopup(editPopup));

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = editForm.querySelector('input[name="name"]').value;
        const text = editForm.querySelector('input[name="text"]').value;
        let hasChanges = false;

        if (title && title !== authorTitle.textContent) {
            authorTitle.textContent = title;
            hasChanges = true;
        }
        if (text && text !== authorText.textContent) {
            authorText.textContent = text;
            hasChanges = true;
        }

        if (hasChanges) {
            editForm.reset();
            togglePopup(editPopup);
        } else {
            alert('No se han realizado cambios.');
        }
    });
};

const handleImagePopup = (openImagePopupButton, imagePopup, closeImagePopupButton, imageUrlInput, previewImage, imageForm, cardGrid) => {
    openImagePopupButton.addEventListener('click', () => togglePopup(imagePopup));
    closeImagePopupButton.addEventListener('click', () => togglePopup(imagePopup));

    imageUrlInput.addEventListener('input', () => {
        const url = imageUrlInput.value;
        if (url) {
            previewImage.src = url;
            previewImage.style.display = 'block';
        } else {
            previewImage.src = '#';
            previewImage.style.display = 'none';
        }
    });

    imageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = imageForm.querySelector('input[name="name"]').value;
        const imageUrl = previewImage.src;

        if (title && imageUrl && imageUrl !== '#') {
            createCard(title, imageUrl, cardGrid);
            imageForm.reset();
            previewImage.src = '#';
            previewImage.style.display = 'none';
            togglePopup(imagePopup);
        } else {
            alert('Por favor, proporcione un título y una imagen.');
        }
    });
};

const createImageViewerPopup = (link, name) => {
    const existingPopup = document.querySelector('.popup--image-viewer');
    if (existingPopup) {
        existingPopup.remove();
    }

    const template = document.querySelector('#popupTemplate').content.cloneNode(true);
    const popupImage = template.querySelector('#popupImage');
    const popupImageName = template.querySelector('#popupImageName');
    const closeImageViewerPopupButton = template.querySelector('#closeImageViewerPopupButton');

    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;

    popupImage.onerror = () => {
        popupImage.src = 'path/to/default/image.jpg';
        popupImage.alt = 'Image not available';
    };

    document.body.appendChild(template);
    const imageViewerPopup = document.querySelector('.popup--image-viewer');
    imageViewerPopup.style.display = 'block';
    overlay.style.display = 'block'; 

    closeImageViewerPopupButton.addEventListener('click', () => {
        if (imageViewerPopup) {
            imageViewerPopup.style.display = 'none';
            imageViewerPopup.remove();
            overlay.style.display = 'none'; 
        }
    });
};

const addImageClickEvents = () => {
    document.querySelectorAll('.card-section__card-img').forEach(img => {
        img.addEventListener('click', () => {
            const imageLink = img.src;
            const imageName = img.nextElementSibling.textContent;
            createImageViewerPopup(imageLink, imageName);
        });
    });
};

overlay.addEventListener('click', (event) => {
    const isClickInsidePopup = event.target.closest('.popup');
    if (!isClickInsidePopup) {
        document.querySelectorAll('.popup--open').forEach(popup => togglePopup(popup));
        overlay.style.display = 'none'; 
    }
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input-error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__submit");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));

        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset);
        });
    });
};

enableValidation();

const init = () => {
    const editProfileButton = document.querySelector('#editProfileButton');
    const closeEditPopupButton = document.querySelector('#closeEditPopupButton');
    const editPopup = document.querySelector('#editPopup');
    const editForm = document.querySelector('.form[name="editProfile"]');
    const authorTitle = document.querySelector('.author__title');
    const authorText = document.querySelector('.author__text');

    const openImagePopupButton = document.querySelector('#openPopupButton');
    const closeImagePopupButton = document.querySelector('#closeImagePopupButton');
    const imagePopup = document.querySelector('#imagePopup');
    const imageForm = document.querySelector('.form[name="addImage"]');
    const previewImage = document.querySelector('#previewImage');
    const imageUrlInput = document.querySelector('#imageUrlInput');
    const cardGrid = document.querySelector('.card-section__grid');

    const initialCards = [
        { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
        { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
        { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
        { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
        { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
        { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
    ];

    initializeCards(initialCards, cardGrid);
    handleEditProfile(editProfileButton, closeEditPopupButton, editPopup, editForm, authorTitle, authorText);
    handleImagePopup(openImagePopupButton, imagePopup, closeImagePopupButton, imageUrlInput, previewImage, imageForm, cardGrid);
    addImageClickEvents();
};

document.addEventListener('DOMContentLoaded', init);
