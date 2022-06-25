//view
const btnSaveArr = document.querySelectorAll(".btnSave");

btnSaveArr.forEach((icon, idx) => {
  icon?.addEventListener("click", () => {
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    console.log("clicked");
    myModal.show();

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
