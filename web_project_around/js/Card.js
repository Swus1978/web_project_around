import { createImageViewerPopup } from "./utils.js"; 


export class Card {
    constructor(data, templateSelector, imagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._imagePopup = imagePopup;
    }

    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        if (!template) {
            console.error(`Template not found: ${this._templateSelector}`);
            return null;
        }

        return template.content.querySelector('.card-section__card').cloneNode(true);
    }

    _handleImageClick() {
        createImageViewerPopup(this._link, this._name);
    }

    _handleDeleteClick() {
        this._cardElement.classList.add('card-section__card--removing');
        this._cardElement.addEventListener('transitionend', () => {
            this._cardElement.remove();
        }, { once: true });
    }

    _handleLikeClick(event) {
        event.target.classList.toggle('card-section__button-like--active');
    }

    _setEventListeners() {
        
        this._cardImage.addEventListener('click', () => this._handleImageClick());

        this._deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            this._handleDeleteClick();
        });

        this._likeButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            this._handleLikeClick(event);
        });
    }

    generateCard() {
        this._cardElement = this._getTemplate();
        if (!this._cardElement) return null;

        this._cardImage = this._cardElement.querySelector('.card-section__card-img');
        this._deleteButton = this._cardElement.querySelector('.card-section__button-delete');
        this._likeButton = this._cardElement.querySelector('.card-section__button-like');
        this._cardTitle = this._cardElement.querySelector('.card-section__card-title');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;


        this._setEventListeners();

        return this._cardElement;
    }
}
