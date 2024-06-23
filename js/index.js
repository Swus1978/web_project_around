document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.querySelector('#openPopupButton');
    const closePopupButton = document.querySelector('#closePopupButton');
    const popup = document.querySelector('#popup');
    const preview = document.querySelector('#preview');
    const imageUrlInput = document.querySelector('#imageUrl');
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
            alert('Por favor, proporciona un título y una imagen.');
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
        deleteButton.className = 'card-section__button card-section__button--trash';
        deleteButton.type = 'image';
        deleteButton.src = '/svg/Trash.svg';
        deleteButton.alt = 'Eliminar';
        deleteButton.title = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            card.remove();
        });

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-section__card-title';
        cardTitle.textContent = title;

        const likeButton = document.createElement('button');
        likeButton.className = 'card-section__button card-section__button--heart';
        likeButton.title = 'Me gusta';

        card.appendChild(img);
        card.appendChild(deleteButton);
        card.appendChild(cardTitle);
        card.appendChild(likeButton);

        cardGrid.appendChild(card);
    };
});
