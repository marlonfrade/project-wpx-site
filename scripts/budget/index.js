// ===========================================================================================
// ---------------------------------------Menu Mobile-----------------------------------------
// ===========================================================================================

const hamburger = document.querySelector("#btnHamburger");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const overlay = document.querySelector(".overlay");
const fade = document.querySelectorAll(".has-fade");
const mobile = document.querySelector("[mobile]");

hamburger.addEventListener("click", function () {
  hamMenu();
});

function hamMenu() {
  if (header.classList.contains("open")) {
    //Fecha o menu Mobile
    body.classList.remove("noscroll");
    header.classList.remove("open");
    fade.forEach(function (element) {
      element.classList.remove("fade-in");
      element.classList.add("fade-out");
    });
  } else {
    //Abre o menu mobile
    body.classList.add("noscroll");
    header.classList.add("open");
    fade.forEach(function (element) {
      element.classList.remove("fade-out");
      element.classList.add("fade-in");
    });
    overlay.addEventListener("click", () => {
      body.classList.remove("noscroll");
      header.classList.remove("open");
      fade.forEach(function (element) {
        element.classList.remove("fade-in");
        element.classList.add("fade-out");
      });
    });
  }
}

// ===========================================================================================
// ---------------------------------------Budget Expanded-------------------------------------
// ===========================================================================================

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("activePanel");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// ===========================================================================================
// --------------------------------------- Open Information Model ----------------------------
// ===========================================================================================

const modal = document.getElementById("myModal");

const buttons = document.querySelectorAll("[myBtn]");

var span = document.getElementsByClassName("closeModal")[0];

buttons.forEach((btn) => {
  btn.onclick = function () {
    modal.style.display = "block";
  };
});

span.onclick = function () {
  modal.style.display = "none";
};

// ===========================================================================================
// --------------------------------------- Open Itens List  ----------------------------------
// ===========================================================================================

const modalItens = document.querySelector("[modalItens]");
const selectBtn = document.querySelectorAll("[select]");
const spanItens = document.querySelector("[closeItens]");
const items = document.querySelectorAll("[item]");

items.forEach((item) => {
  const select = item.querySelector("[select]");

  select.addEventListener("click", () => {
    modalItens.style.display = "block";
    if (!item.classList.contains("selected")) {
      item.classList.toggle("selected");
    }

    const openList = document.getElementById("openList");

    openList.classList.remove("hide");

    openList.addEventListener("click", () => {
      modalItens.style.display = "block";
    });

    spanItens.onclick = function () {
      modalItens.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modalItens) {
        modalItens.style.display = "none";
      } else if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
});
