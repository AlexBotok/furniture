function attachModalHandlers(modal, button, closeButton) {
  button.addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

let modal = document.getElementById("myModal");
let btn = document.getElementById("mybtn");
let span = document.querySelector(".close");
attachModalHandlers(modal, btn, span);

let modal1 = document.getElementById("myModal1");
let btn1 = document.getElementById("mybtn1");
let span1 = document.querySelector(".close1");
attachModalHandlers(modal1, btn1, span1);

