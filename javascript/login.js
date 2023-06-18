const form_Open_Btn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
form_Content = document.querySelector(".form_content"),
form_Close_Btn = document.querySelector(".form_close"),
signup_Btn = document.querySelector("#sign-up"),
login_Btn = document.querySelector("#login"),
pw_Show_Hide = document.querySelectorAll(".pw_hide");

form_Open_Btn.addEventListener("click", () => home.classList.add("show"));
form_Close_Btn.addEventListener("click", () => home.classList.remove("show"));

pw_Show_Hide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let get_Pw_Input = icon.parentElement.querySelector("input");
    if (get_Pw_Input.type === "password") {
      get_Pw_Input.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      get_Pw_Input.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signup_Btn.addEventListener("click", (e) => {
  e.preventDefault();
  form_Content.classList.add("active");
});
login_Btn.addEventListener("click", (e) => {
  e.preventDefault();
  form_Content.classList.remove("active");
});