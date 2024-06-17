document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.querySelector('#openPopupButton');
    const closePopupButton = document.querySelector('#closePopupButton');
    const popup = document.querySelector('#popup');
    const preview = document.querySelector('#preview');
    const imageUrlInput = document.querySelector('#imageUrl');
    const form = document.querySelector('.popup__form');
    const cardGrid = document.querySelector('.card-section__grid');

    const togglePopup = () => {
        popup.classList.toggle('open');
    };

    openPopupButton.addEventListener('click', togglePopup);
    closePopupButton.addEventListener('click', togglePopup);

    imageUrlInput.addEventListener('input', () => {
        const url = imageUrlInput.value;
        if (url) {
            preview.src = url;
            preview.style.display = 'block';
        } else {
            preview.src = '#';
            preview.style.display = 'none';
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = form.querySelector('input[name="name"]').value;
        const imageUrl = preview.src;

        if (title && imageUrl && imageUrl !== '#') {
            createCard(title, imageUrl);
            form.reset();
            preview.src = '#';
            preview.style.display = 'none';
            togglePopup();
        } else {
            alert('Please provide both a title and an image.');
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
        deleteButton.className = 'card__trash-button';
        deleteButton.type = 'image';
        deleteButton.src = 'images/Trash.png';
        deleteButton.alt = 'Trash';
        deleteButton.title = 'Delete';
        deleteButton.addEventListener('click', () => {
            card.remove();
        });

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-section__card-title';
        cardTitle.textContent = title;

        const likeButton = document.createElement('button');
        likeButton.className = 'card-section__card-button card-section__card-button--heart';
        likeButton.title = 'Like';

        const heartIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        heartIcon.className = 'card-section__card-heart';
        heartIcon.setAttribute('width', '21');
        heartIcon.setAttribute('height', '19');
        heartIcon.setAttribute('viewBox', '0 0 21 19');
        heartIcon.setAttribute('fill', 'none');

        const heartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        heartPath.setAttribute('d', 'M18.8368 2.20277L18.8394 2.20544C20.7188 4.13299 20.7225 7.31163 18.8368 9.26495L10.4812 17.9202L2.14988 9.29C1.25494 8.34225 0.75 7.08483 0.75 5.74496C0.75 4.39717 1.23873 3.14375 2.14714 2.20276L2.14972 2.20008C3.99577 0.268703 7.0174 0.264567 8.88883 2.22231L9.94166 3.3129L10.4867 3.87752L11.0261 3.30743L12.0736 2.20014C13.9438 0.265745 16.9677 0.266621 18.8368 2.20277Z');
        heartPath.setAttribute('stroke', 'black');
        heartPath.setAttribute('stroke-width', '1.5');

        heartIcon.appendChild(heartPath);
        likeButton.appendChild(heartIcon);

        card.appendChild(img);
        card.appendChild(deleteButton);
        card.appendChild(cardTitle);
        card.appendChild(likeButton);

        cardGrid.appendChild(card);
    };
});














































































