document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.querySelector('#openPopupButton');
    const closePopupButton = document.querySelector('#closePopupButton');
    const popup = document.querySelector('#popup');
    const form = document.querySelector('.popup__form');


    const togglePopup = () => {
        popup.classList.toggle('popup--open');
    };

    openPopupButton.addEventListener('click', togglePopup);
    closePopupButton.addEventListener('click', togglePopup);

    editProfileButton.addEventListener('click', () => {
        form.querySelector('input[name="name"]').value = authorTitle.textContent;
        form.querySelector('input[name="text"]').value = authorText.textContent;
        togglePopup();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = form.querySelector('input[name="name"]').value;
        const text = form.querySelector('input[name="text"]').value;

        if (title && text) {
            authorTitle.textContent = title;
            authorText.textContent = text;
            form.reset();
            togglePopup();
        } else {
            alert('Please provide both a title and text.');
        }
    });
});
