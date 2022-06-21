const form = document.querySelector(".login-form");

const login = async () => {
  //view
  const p = document.querySelector(".message");
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const URL = "/users/login";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(URL, options);
    console.log(res.status);
    if (res.status === 406) {
      p.classList.add("text-danger");
      p.textContent = "Sorry you have to register first";
    } else if (res.status === 403) {
      p.classList.add("text-danger");
      p.textContent = "Sorry incorrect password";
    } else {
      location.href = "/homepage";
    }
  } catch (err) {
    console.log(err.message);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
