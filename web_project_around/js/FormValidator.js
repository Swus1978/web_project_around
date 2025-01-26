export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
        this._submitButton = this._formElement.querySelector(this.config.submitButtonSelector);

        if (!this._submitButton) {
            console.error("Form submit button not found for:", this._formElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        if (!errorElement) {
            console.error(`Error element not found for input: ${inputElement.id}`);
            return;
        }
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        if (!errorElement) return;

        // ❌ Fix: Do NOT clear error if input is required and empty
        if (inputElement.validity.valueMissing) {
            errorElement.textContent = "Este campo no puede estar vacío.";
        } else {
            inputElement.classList.remove(this.config.inputErrorClass);
            errorElement.classList.remove(this.config.errorClass);
            errorElement.textContent = "";
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    _toggleButtonState() {
        if (!this._submitButton) return;
        this._submitButton.disabled = this._hasInvalidInput();
        this._submitButton.classList.toggle("button--disabled", this._hasInvalidInput());
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            if (this._hasInvalidInput()) {
                event.preventDefault();
                console.warn("Form submission blocked due to validation errors");
            }
        });
    }
}
