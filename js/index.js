// Toggle popup visibility
const togglePopup = (popup) => {
    popup.classList.toggle('popup--open');
};

// Create a new card
const createCard = (title, imageUrl, cardGrid) => {
    const card = document.createElement('div');
    card.className = 'card-section__card';

    const img = document.createElement('img');
    img.className = 'card-section__card-img';
    img.src = imageUrl;
    img.alt = title;
    img.dataset.imageSrc = imageUrl;

    img.addEventListener('click', () => {
        createImageViewerPopup(imageUrl, title); // Open the image viewer popup
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'card-section__button card-section__button-delete';
    deleteButton.innerHTML = '<img src="./svg/Trash.svg" alt="Delete" title="Delete">';
    deleteButton.addEventListener('click', () => {
        card.remove();
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

// Initialize cards
const initializeCards = (initialCards, cardGrid) => {
    initialCards.forEach(card => createCard(card.name, card.link, cardGrid));
};

// Edit profile logic
const handleEditProfile = (editProfileButton, editPopup, editForm, authorTitle, authorText) => {
    editProfileButton.addEventListener('click', () => {
        editForm.querySelector('input[name="name"]').value = authorTitle.textContent;
        editForm.querySelector('input[name="text"]').value = authorText.textContent;
        togglePopup(editPopup);
    });

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

// Image popup logic
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
            alert('Please provide a title and an image.');
        }
    });
};

// Create image viewer popup
const createImageViewerPopup = (link, name) => {
    const template = document.querySelector('#popupTemplate').content.cloneNode(true);

    const popupImage = template.querySelector('#popupImage');
    const popupImageName = template.querySelector('#popupImageName');
    const closeImageViewerPopupButton = template.querySelector('#closeImageViewerPopupButton');

    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;

    document.body.appendChild(template);

    const imageViewerPopup = document.querySelector('.popup--image-viewer');
    imageViewerPopup.classList.add('popup--open');

    closeImageViewerPopupButton.addEventListener('click', () => {
        imageViewerPopup.classList.remove('popup--open');
        imageViewerPopup.remove();
    });
};

// Add event listeners to images for viewing
const addImageClickEvents = () => {
    document.querySelectorAll('.card-section__card-img').forEach(img => {
        img.addEventListener('click', () => {
            const imageLink = img.src;
            const imageName = img.nextElementSibling.textContent;
            createImageViewerPopup(imageLink, imageName);
        });
    });
};

// Main function to initialize everything
const init = () => {
    const editProfileButton = document.querySelector('#editProfileButton');
    const closeEditPopupButton = document.querySelector('#closeEditPopupButton');
    const editPopup = document.querySelector('#editPopup');
    const editForm = document.querySelector('.popup__form[name="editProfile"]');
    const authorTitle = document.querySelector('.author__title');
    const authorText = document.querySelector('.author__text');

    const openImagePopupButton = document.querySelector('#openPopupButton');
    const closeImagePopupButton = document.querySelector('#closeImagePopupButton');
    const imagePopup = document.querySelector('#imagePopup');
    const imageForm = document.querySelector('.popup__form[name="addImage"]');
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

    // Initialize cards
    initializeCards(initialCards, cardGrid);

    // Handle profile edit
    handleEditProfile(editProfileButton, editPopup, editForm, authorTitle, authorText);

    // Handle image popup
    handleImagePopup(openImagePopupButton, imagePopup, closeImagePopupButton, imageUrlInput, previewImage, imageForm, cardGrid);

    // Add image click events for image viewing
    addImageClickEvents();
};

// Call the init function after script loads
init();
