document.addEventListener('DOMContentLoaded', () => {
    const editProfileButton = document.querySelector('#editProfileButton');
    const closeEditPopupButton = document.querySelector('#closeEditPopupButton');
    const editPopup = document.querySelector('#editPopup');
    const editForm = document.querySelector('.popup__form[name="editProfile"]');
    const authorTitle = document.querySelector('.author__title');
    const authorText = document.querySelector('.author__text');

    const togglePopup = (popup) => {
        popup.classList.toggle('popup--open');
    };

    const toggleEditPopup = () => {
        editForm.elements['editName'].value = authorTitle.textContent.trim();
        editForm.elements['editText'].value = authorText.textContent.trim();
        editPopup.classList.toggle('popup--open');
    };

    editProfileButton.addEventListener('click', () => {
        toggleEditPopup();
    });

    closeEditPopupButton.addEventListener('click', () => {
        editPopup.classList.remove('popup--open');
    });

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = editForm.elements['editName'].value.trim();
        const text = editForm.elements['editText'].value.trim();

        if (title && text) {
            authorTitle.textContent = title;
            authorText.textContent = text;
            editForm.reset();
            toggleEditPopup();
        } else {
            alert('Please provide both a title and text.');
        }
    });
});
