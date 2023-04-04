let modal = document.getElementById("myModal");
let btn = document.getElementById("mybtn");
let span = document.querySelector(".close");

btn.addEventListener("click", function () {
  document.body.style.overflow = "hidden";
  modal.style.display = "block";
});

span.addEventListener("click", function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
