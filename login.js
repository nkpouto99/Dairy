function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        if (e.target.id === "loginUsername" && e.target.value.length > 0 && e.target.value.length < 8) {
            setInputError(inputElement, "Your username must be up to 8 digit");
        }
        setFormMessage(loginForm, "Error", "Invalid Username/password combination");
    });

    document.querySelectorAll("#loginUsername").forEach(inputElement => {
        inputElement.addEventListener("submit", e => {
            if (e.target.id === "loginUsername" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Incorrect");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Your username must be up to 8 digit with combination of letters and numbers");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelectorAll("#passcode").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "passcode" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Your password must be up to 8 characters");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelectorAll("#passcodeRe-enter").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            let passcode = document.querySelector("#passcode").value
            let passcodeEnter = document.querySelector("#passcodeRe-enter").value
            if (passcodeEnter === passcode ) {
                setInputSuccess(inputElement, " It's the same");
            }else{
                setInputError(inputElement, "it must be the same with your password");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelectorAll("#loginPassword").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            let loginPasscode = document.querySelector("#loginPassword").value
            if (loginPasscode === '12345678' ) {
                setInputSuccess(inputElement, " It's the same");
            }else if (loginPasscode === 'targettech' ) {
                setInputSuccess(inputElement, " It's the same");
            }else if (loginPasscode === 'targetech1' ) {
                setInputSuccess(inputElement, " It's the same");
            }else if (loginPasscode === 'targetofficial' ) {
                setInputSuccess(inputElement, " It's the same");
            }else{
                setInputError(inputElement, "Incorrect password");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelector("#loginPassword").forOne(inputPassword => {
        inputPassword.addEventListener("blur", e => {
            e.preventDefault();
            if (e.target.id === "loginPassword" && e.target.value == "1234") {
                setInputError(inputPassword, "Incorrect password try again");
            }
        });

        inputPassword.addEventListener("input", e => {
            e.preventDefault();
            clearInputError(inputPassword);
        });
    });
});

const button = document.querySelector("#button");
button.addEventListener("onclick",()=>{
    alert("Sign-up successful now login");
});

setFormMessage(loginForm, "success", "Login successful");
