//view
const btnSaveArr = document.querySelectorAll(".btnSave");

btnSaveArr.forEach((icon, idx) => {
  // const saveIcon = icon.document.querySelector(".fa-solid");
  icon?.addEventListener("click", () => {
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    console.log("clicked");
    myModal.show();
    console.log(icon.firstElementChild);
    icon.firstElementChild.classList.remove("text-success");
    icon.firstElementChild.classList.add("text-warning");
    (async () => {
      try {
        const res = fetch("/homepage/data", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idx }),
        });
      } catch (err) {
        console.log(err.message);
      }
    })();
  });
});

const btnDeleteAll = document.querySelector(".deleteAll");
btnDeleteAll?.addEventListener("click", () => {
  console.log("clicked");
  (async () => {
    fetch("/homepage/delete");
  })();
  setTimeout(() => {
    location.reload();
  }, 100);
});

const btnDeleteArr = document.querySelectorAll(".trash");
btnDeleteArr.forEach((item, idx) => {
  item.addEventListener("click", () => {
    console.log("clicked");
    (async () => {
      const res = fetch("/homepage/delete", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idx }),
      });
    })();
    setTimeout(() => {
      location.reload();
    }, 300);
  });
});
