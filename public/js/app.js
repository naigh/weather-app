//puzzle.mead.io/puzzle

const searchForm = document.querySelector("form");
const searchField = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3001/weather?address=" + searchField.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          msg1.textContent = data.location;
          msg2.textContent = data.forecast;
        }
      });
    }
  );
});