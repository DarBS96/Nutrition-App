console.log("hi");

const login = async () => {
  console.log(document.getElementById("username"));
  try {
    const username = document.getElementById("username").value;
    console.log(username);
    const password = document.getElementById("password").value;
    console.log(password);
    const URL = "/users/login";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(URL, options);
    console.log(res);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};
