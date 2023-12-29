const lengthSlide = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
inputArea = document.querySelector(".input-box");
passIndicator = document.querySelector(".pass-indicator");
const copyIcon = document.querySelector(".input-box span")
const btn = document.querySelector(".btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@~#$%^&*()_+-<>?|\`",
    // includes_spaces: "",abcdefghijklmnopqrstuvwxyz
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    exclude_spaces = false,
    passlength = lengthSlide.value;

options.forEach(option => { //looping through each options
    if (option.checked) { //if checkbox is checked
        if(option.id !== "exc-duplicate" && option.id !== "spaces"){

            // adding paarticular key value from character object to staticPassword
            staticPassword += characters[option.id];
        }else if (option.id === "spaces") {
            staticPassword += ` ${staticPassword}, `
        }
        else{
            exclude_spaces = true;
        }
    }
});

for (let i = 0; i < passlength; i++) {
    let randomChars = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (exclude_spaces) {
        !randomPassword.includes(randomChars) || randomChars == " " ? randomPassword += randomChars : i--;
    }else{
        randomPassword += randomChars;
    }
}
inputArea.value = randomPassword; //passing random password to passwordInputArea
}

updatePasswordInput = () => {
    passIndicator.id = lengthSlide.value <= 8 ? "weak" : lengthSlide.value <= 16 ? "medium" : "strong";
}

updateSlide = () => {
    document.querySelector(".pass-length span").innerHTML = lengthSlide.value;
    generatePassword();
    updatePasswordInput();
}
updateSlide();

const copyPassword = () => {
    navigator.clipboard.writeText(inputArea.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "fa-regular fa-copy";
        
    }, 2000)
}

copyIcon.addEventListener("click", copyPassword);
lengthSlide.addEventListener("input", updateSlide);
btn.addEventListener("click", generatePassword);
