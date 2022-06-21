"use strict";

const form = document.forms.registerForm;
const messageHeading = document.querySelector(".message");

const register = (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const registerationData = [...formData].reduce((acc, curr) => {
    return { ...acc, [curr[0]]: curr[1] };
  }, {});
  return registerationData;
};

const sendDataToServer = async (dataObj, method, url) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  const data = await res.json();
  console.log(data);
  return { status: res.status, msg: data.msg };
};

const showMessage = (color) => {
  messageHeading.classList.remove("d-none");
  messageHeading.classList.remove(`text-danger`);
  messageHeading.classList.remove(`text-success`);
  messageHeading.classList.add(`text-${color}`);
};

const renderErrorMessage = (message) => {
  console.log(message);
  showMessage("danger");
  messageHeading.textContent = message;
};

const renderSuccessMessage = (message) => {
  showMessage("success");
  messageHeading.textContent = message;
};

form.addEventListener("submit", async (e) => {
  const formData = register(e);
  const data = await sendDataToServer(formData, "POST", "/users/register");
  if (data.status === 406) {
    renderErrorMessage(data.msg);
  } else if (data.status === 200) {
    renderSuccessMessage(data.msg);
    const spinner = document.querySelector(".spinner");
    spinner.classList.remove("d-none");
    form.classList.add("d-none");
    setTimeout(() => {
      location.href = "/users/login";
    }, 5000);
  }
});
