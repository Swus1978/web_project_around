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
    const popupImageViewer = document.querySelector('imageViewerPoppu');
    const imageForm = document.querySelector('.popup__form[name="addImage"]');
    const previewImage = document.querySelector('#previewImage');
    const imageUrlInput = document.querySelector('#imageUrlInput');
    const cardGrid = document.querySelector('.card-section__grid');
    const buttonLikeHeart = document.querySelector(".card-section__button-like")

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


    // Load initial cards
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

    buttonLikeHeart.querySelector("buttonLikeHeart").addEventListener("click", function (e) {
        e.target.classList.toggle(".card-section__button-like");
    })

    const section = document.querySelector('.popup--image-viewer');
  
    // Select all card images within the section
    const cards = section.querySelectorAll('.card__image');
    
    // Select the popup container and elements
    const popup = section.querySelector('.imageViewerPopup');
    const popupImage = popup.querySelector('.popup__image');
    const popupOverlay = popup.querySelector('.popup__overlay');
  
    // Add click event listener to each card image
    cards.forEach(card => {
      card.addEventListener('click', function() {
        // Get the source of the clicked image
        const imageUrl = this.src;
        
        // Set the source of the popup image
        popupImage.src = imageUrl;
        
        // Show the popup
        popup.classList.add('popup--visible');
      });
    });
  
    // Add click event listener to the overlay to close the popup
    popupOverlay.addEventListener('click', function() {
      // Hide the popup
      popup.classList.remove('popup--visible');
      
      // Clear the image source to prevent flickering
      popupImage.src = '';
    });
  

});
