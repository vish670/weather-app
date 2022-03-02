console.log("client side javascript renered");

const address = document.getElementById("add");
const weatherForm = document.querySelector("form");
const messageOne = document.getElementById("error");
const messageTwo = document.getElementById("forecast");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = "/weather?address=" + address.value;
  messageOne.innerHTML = "Loading...";
  messageTwo.innerHTML = "";
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerHTML = data.error;
      } else {
        messageOne.innerHTML = data.location;
        messageTwo.innerHTML = data.forecast;
      }
    });
  });
});
