"use strict";

const form = document.forms.registerForm;

const register = (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const registerationData = [...formData].reduce((acc, curr) => {
    return { ...acc, [curr[0]]: curr[1] };
  }, {});
  return registerationData;
};

const sendDataToServer = async (dataObj, method, url) => {
  const res = fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
};

form.addEventListener("submit", async (e) => {
  const formData = register(e);
  sendDataToServer(formData, "POST", "/users/register");
});
