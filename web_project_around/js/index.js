import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {togglePopup} from "./utils.js"; 


document.addEventListener('DOMContentLoaded', () => {
    const imageTitleInput = document.getElementById("imageTitle");

    const cardGrid = document.querySelector('.card-section__grid');


    const editPopup = document.getElementById("editPopup");
    const editProfileButton = document.getElementById("editProfileButton");
    const closeEditPopupButton = document.getElementById("closeEditPopupButton");
    const editForm = document.querySelector('.form[name="editProfile"]');
    const authorTitle = document.querySelector('.author__title'); 
    const authorText = document.querySelector('.author__text'); 
    const editNameInput = document.getElementById("editName");
    const editTextInput = document.getElementById("editText");


    const imagePopup = document.getElementById('imagePopup');
    const openImagePopupButton = document.getElementById('openPopupButton');
    const closeImagePopupButton = document.getElementById('closeImagePopupButton');
 
    const imageForm = document.querySelector('.form[name="addImage"]');
    const imageUrlInput = document.getElementById('imageUrlInput');
    const previewImage = document.getElementById('previewImage');


    function handleEditProfile() {

        editProfileButton.addEventListener("click", () => {
            editNameInput.value = authorTitle.textContent.trim();
            editTextInput.value = authorText.textContent.trim();
            togglePopup(editPopup);
        });
    
 
        closeEditPopupButton.addEventListener("click", () => {
            togglePopup(editPopup);
        });
    

        editForm.addEventListener("submit", (event) => {
            event.preventDefault(); 
            console.log("Edit form submitted");
    
            const newTitle = editNameInput.value.trim();
            const newText = editTextInput.value.trim();
            let hasChanges = false;
    
            if (newTitle && newTitle !== authorTitle.textContent) {
                console.log(`Updating title: ${authorTitle.textContent} → ${newTitle}`);
                authorTitle.textContent = newTitle;
                hasChanges = true;
            }
    
          
            if (newText && newText !== authorText.textContent) {
                authorText.textContent = newText;
                hasChanges = true;
            }
    
            if (hasChanges) {
                editForm.reset();
                console.log("Profile updated successfully!");
                togglePopup(editPopup);
            } else {
                alert("No se han realizado cambios.");
            }
        });
    }
    
    handleEditProfile();

    document.querySelectorAll('.form').forEach(formElement => {
        const validator = new FormValidator({
            inputSelector: '.form__input',
            submitButtonSelector: '.popup__button-submit',
            inputErrorClass: 'form__input-error',
            errorClass: 'form__input-error_active'
        }, formElement);
        validator.enableValidation();
    });
    

    function addCardClickEvents() {
        document.querySelectorAll('.card-section__card-img').forEach(img => {
            img.removeEventListener('click', handleCardClick);
            img.addEventListener('click', handleCardClick);
        });
    }

    function handleCardClick(event) {
        const cardImage = event.target;
        const cardTitle = cardImage.closest('.card-section__card').querySelector('.card-section__card-title')?.textContent || "Unknown Title";
        
        if (cardImage) {
            createImageViewerPopup(cardImage.src, cardTitle);
        }
    }


    openImagePopupButton.addEventListener('click', () => togglePopup(imagePopup));
    closeImagePopupButton.addEventListener('click', () => togglePopup(imagePopup));


   
      imageUrlInput.addEventListener("input", () => {
        const imageUrl = imageUrlInput.value.trim();
        previewImage.style.display = imageUrl ? "block" : "none";
        previewImage.src = imageUrl || "#";
    });

  
    const initialCards = [
        { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
        { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
        { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
        { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
        { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
        { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
    ];

    initialCards.forEach(cardData => {
        const card = new Card(cardData, '#cardTemplate');
        const cardElement = card.generateCard();
        cardGrid.appendChild(cardElement);
    });

    addCardClickEvents(); 
  

   
  

    document.querySelectorAll('.form').forEach(formElement => {
        const validator = new FormValidator({
            inputSelector: '.form__input',
            submitButtonSelector: '.popup__button-submit',
            inputErrorClass: 'form__input-error',
            errorClass: 'form__input-error_active'
        }, formElement);
        validator.enableValidation();
    });

 
    function createImageViewerPopup(imageSrc, imageName) {
        const existingPopup = document.querySelector('.popup--image-viewer');
        if (existingPopup) existingPopup.remove();

        const template = document.querySelector('#popupTemplate').content.cloneNode(true);
        const popupElement = template.querySelector('.popup--image-viewer');

        const popupImage = popupElement.querySelector('#popupImage');
        const popupImageName = popupElement.querySelector('#popupImageName');
        const closeImageViewerPopupButton = popupElement.querySelector('#closeImageViewerPopupButton');

        popupImage.src = imageSrc;
        popupImage.alt = imageName;
        popupImageName.textContent = imageName;

        popupImage.onerror = () => {
            popupImage.src = './images/default-image.jpg';
            popupImage.alt = 'Image not available';
        };

        document.body.appendChild(popupElement);
        togglePopup(popupElement);

        closeImageViewerPopupButton.addEventListener('click', () => {
            popupElement.remove();
        });
    }

    addCardClickEvents(); 
 
    function createImageViewerPopup(imageSrc, imageName) {
        const existingPopup = document.querySelector('.popup--image-viewer');
        if (existingPopup) existingPopup.remove();

        const template = document.querySelector('#popupTemplate').content.cloneNode(true);
        const popupElement = template.querySelector('.popup--image-viewer');

        const popupImage = popupElement.querySelector('#popupImage');
        const popupImageName = popupElement.querySelector('#popupImageName');
        const closeImageViewerPopupButton = popupElement.querySelector('#closeImageViewerPopupButton');

        popupImage.src = imageSrc;
        popupImage.alt = imageName;
        popupImageName.textContent = imageName;

        popupImage.onerror = () => {
            popupImage.src = './images/default-image.jpg';
            popupImage.alt = 'Image not available';
        };

      
        document.body.appendChild(popupElement);
        popupElement.style.display = "flex"; 
        popupElement.classList.add("popup--open");


        const overlay = document.getElementById('overlay');
        overlay.style.display = "block";

        closeImageViewerPopupButton.addEventListener('click', () => {
            popupElement.remove();
            overlay.style.display = "none";
        });

       
        overlay.addEventListener('click', () => {
            popupElement.remove();
            overlay.style.display = "none";
        });
    }
    function createNewCard(title, imageUrl) {
        if (!imageUrl.trim()) {
            console.warn("No image URL provided");
            alert("Debes pegar una URL de imagen válida.");
            return;
        }

        const cardData = { name: title || "Nueva Imagen", link: imageUrl };
        const card = new Card(cardData, "#cardTemplate");
        const cardElement = card.generateCard();

       

        cardGrid.appendChild(cardElement); 
        addCardClickEvents(); 
        console.log("New image card added:", title, imageUrl);

        imageForm.reset();
        togglePopup(imagePopup);  
    }

  
    imageForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        console.log("Image form submitted");  

        const imageUrl = imageUrlInput.value.trim();
        const imageTitle = imageTitleInput.value.trim();
        createNewCard(imageTitle, imageUrl);
    });

   
    imageUrlInput.addEventListener("input", () => {
        const imageUrl = imageUrlInput.value.trim();
        if (imageUrl) {
            previewImage.style.display = "block";
            previewImage.src = imageUrl;
        } else {
            previewImage.style.display = "none";
            previewImage.src = "";
        }
    });

   
    function addCardClickEvents() {
        document.querySelectorAll(".card-section__card-img").forEach((img) => {
            img.removeEventListener("click", handleCardClick);
            img.addEventListener("click", handleCardClick);
        });
    }

   
    function handleCardClick(event) {
        const cardImage = event.target;
        const cardTitle =
            cardImage.closest(".card-section__card").querySelector(".card-section__card-title")
                ?.textContent || "Unknown Title";

        if (cardImage) {
            createImageViewerPopup(cardImage.src, cardTitle);
        }
    }

    
});
