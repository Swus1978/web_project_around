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
    const popupImageViewer = document.querySelector('#imageViewerPopup'); 
    const imageForm = document.querySelector('.popup__form[name="addImage"]');
    const previewImage = document.querySelector('#previewImage');
    const imageUrlInput = document.querySelector('#imageUrlInput');
    const cardGrid = document.querySelector('.card-section__grid');
    const buttonLikeHeart = document.querySelector(".card-section__button-like");

    const initialCards = [
        { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
        { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
        { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
        { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
        { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
        { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
    ];

    const togglePopup = (popup) => {
        popup.classList.toggle('popup--open');
    };

    const createCard = (title, imageUrl) => {
        const card = document.createElement('div');
        card.className = 'card-section__card';
    
        const img = document.createElement('img');
        img.className = 'card-section__card-img';
        img.src = imageUrl;
        img.alt = title;
        img.dataset.imageSrc = imageUrl;
    
        img.addEventListener('click', () => {
            popupImage.src = img.getAttribute('data-image-src');
            imageViewerPopup.classList.add('popup--open');
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
    
    
    initialCards.forEach(card => createCard(card.name, card.link));

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

    buttonLikeHeart.addEventListener("click", function (e) {
        e.target.classList.toggle("card-section__button-like--active");
    });

    const previewContainer = document.querySelector('.popup--image-viewer');
    const closeButton = document.getElementById('closeImageViewerPopupButton');
    const popupImage = document.getElementById('popupImage');

    document.querySelectorAll('.card-section__card-img').forEach(img => {
        img.addEventListener('click', () => {
            const imageUrl = img.getAttribute('data-image-src');
            openImagePopup(imageUrl); 
        });
    });

    const openImagePopup = (imageUrl) => {
        if (previewContainer && popupImage) {
            popupImage.src = imageUrl; 
            previewContainer.classList.add('popup--open'); 
        }
    };

    const closeImagePopup = () => {
        if (previewContainer) {
            previewContainer.classList.remove('popup--open'); 
        }
    };

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeImagePopup();
        });
    }

});
