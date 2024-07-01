document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.querySelector('#openPopupButton');
    const closePopupButton = document.querySelector('#closePopupButton');
    const popup = document.querySelector('#popup');
    const previewImage = document.querySelector('#previewImage');
    const imageUrlInput = document.querySelector('#imageUrlInput');
    const form = document.querySelector('.popup__form');
    const cardGrid = document.querySelector('.card-section__grid');

    const togglePopup = () => {
        popup.classList.toggle('popup--open');
    };

    openPopupButton.addEventListener('click', togglePopup);
    closePopupButton.addEventListener('click', togglePopup);

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

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = form.querySelector('input[name="name"]').value;
        const imageUrl = previewImage.src;

        if (title && imageUrl && imageUrl !== '#') {
            createCard(title, imageUrl);
            form.reset();
            previewImage.src = '#';
            previewImage.style.display = 'none';
            togglePopup();
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
