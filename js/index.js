document.addEventListener('DOMContentLoaded', () => {
  
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


    const togglePopup = (popup) => {
        popup.classList.toggle('popup--open');
    };


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

        if (title && text) {
            authorTitle.textContent = title;
            authorText.textContent = text;
            editForm.reset();
            togglePopup(editPopup);
        } else {
            alert('Please provide both a title and text.');
        }
    });

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
            createCard(title, imageUrl);
            imageForm.reset();
            previewImage.src = '#';
            previewImage.style.display = 'none';
            togglePopup(imagePopup);
        } else {
            alert('Please provide a title and an image.');
        }
    });

    const createCard = (title, imageUrl) => {
        const card = document.createElement('div');
        card.className = 'card-section__card';

        const img = document.createElement('img');
        img.className = 'card-section__card-img';
        img.src = imageUrl;
        img.alt = title;

        const deleteButton = document.createElement('input');
        deleteButton.className = 'card-section__button card-section__button-delete';
        deleteButton.type = 'image';
        deleteButton.src = '/svg/Trash.svg';
        deleteButton.alt = 'Delete';
        deleteButton.title = 'Delete';
        deleteButton.addEventListener('click', () => {
            card.remove();
        });

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-section__card-title';
        cardTitle.textContent = title;

        const likeButton = document.createElement('button');
        likeButton.className = 'card-section__button card-section__button-like';
        likeButton.title = 'Like';

        card.appendChild(img);
        card.appendChild(deleteButton);
        card.appendChild(cardTitle);
        card.appendChild(likeButton);

        cardGrid.appendChild(card);
    };
});
