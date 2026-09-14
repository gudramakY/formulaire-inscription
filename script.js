const form = document.getElementById("inscriptionForm");
const titre = document.querySelector(".log h1");
const Name = document.getElementById("nom");
const Mail = document.getElementById("email");
const PassWord = document.getElementById("password");
const ConfirmPassWord = document.getElementById("confirmPassword");
const successMessage = document.getElementById("successMessage");

const nameError = document.getElementById("nomError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

function validateForm(input, condition, Error) {
  if (condition) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    Error.classList.remove("show");
    return true;
  } else {
    input.classList.add("invalid");
    input.classList.remove("valid");
    Error.classList.add("show");
    return false;
  }
}

Name.addEventListener("input", () => {
  validateForm(Name, Name.value.length >= 3, nameError);
});
Mail.addEventListener("input", () => {
  const validEmail = Mail.value.includes("@") && Mail.value.includes(".");
  validateForm(Mail, validEmail, emailError);
});
PassWord.addEventListener("input", () => {
  const longueur = PassWord.value.length >= 6;
  const contenirChifrre = /\d/.test(PassWord.value);
  const passCorrect = longueur && contenirChifrre;
  validateForm(PassWord, passCorrect, passwordError);

  if (ConfirmPassWord.value !== "") {
    const validPass = ConfirmPassWord.value === PassWord.value;
    validateForm(ConfirmPassWord, validPass, confirmError);
  }
});
ConfirmPassWord.addEventListener("input", () => {
  const validPass = ConfirmPassWord.value === PassWord.value;
  validateForm(ConfirmPassWord, validPass, confirmError);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const validNom = validateForm(Name, Name.value.length >= 3, nameError);
  const emailValid = validateForm(
    Mail,
    Mail.value.includes("@") && Mail.value.includes("."),
    emailError,
  );
  const validPass = validateForm(
    PassWord,
    PassWord.value.length >= 6 && /\d/.test(PassWord.value),
    passwordError,
  );
  const validConfirm = validateForm(
    ConfirmPassWord,
    ConfirmPassWord.value === PassWord.value,
    confirmError,
  );

  if (validNom && emailValid && validPass && validConfirm) {
    form.style.display = "none";
    successMessage.classList.add("show");
    titre.style.display = "none";
    successMessage.innerHTML = `<h1>Salut ! <span><b>${Name.value}</b></span></h1>
    <h3><b>Votre email :</b> <span>${Mail.value}</span></h3>
    <p>Nous sommes ravi de vous voir !</p>`;
  } else {
    alert("Veuillez corriger les erreurs");
  }
});
