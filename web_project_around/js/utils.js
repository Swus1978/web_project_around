export const togglePopup = (popup) => {
    const overlay = document.getElementById('overlay');
    if (!popup) return;

    const isOpen = popup.classList.toggle('popup--open');
    
    overlay.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
};

export const createImageViewerPopup = (link, name) => {
 
    const existingPopup = document.querySelector('.popup--image-viewer');
    if (existingPopup) existingPopup.remove();


    const template = document.querySelector('#popupTemplate').content.cloneNode(true);
    const popupElement = template.querySelector('.popup--image-viewer');

    if (!popupElement) {
        console.error("Popup template not found!");
        return;
    }


    const popupImage = popupElement.querySelector('#popupImage');
    const popupImageName = popupElement.querySelector('#popupImageName');
    const closeImageViewerPopupButton = popupElement.querySelector('#closeImageViewerPopupButton');
    const overlay = document.getElementById('overlay');

    if (!popupImage || !popupImageName || !closeImageViewerPopupButton) {
        console.error("One or more popup elements are missing.");
        return;
    }

  
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;

    popupImage.onerror = function () {
        this.src = './images/default-image.jpg'; 
        this.alt = 'Image not available';
    };

  
    document.body.appendChild(popupElement);


    setTimeout(() => popupElement.classList.add('popup--open'), 10);
    overlay.style.display = 'block';

   
    closeImageViewerPopupButton.addEventListener('click', () => {
        closePopup(popupElement);
    });

    
    overlay.addEventListener('click', (event) => {
        if (!event.target.closest('.popup--image-viewer')) {
            closePopup(popupElement);
        }
    });
};


const closePopup = (popupElement) => {
    popupElement.classList.remove('popup--open');
    setTimeout(() => popupElement.remove(), 300);
    document.getElementById('overlay').style.display = 'none';
};
