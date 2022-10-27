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

var constructionBtn = document.querySelector(".constructionBtn");
var miningBtn = document.querySelector(".miningBtn");
var forestBtn = document.querySelector(".forestBtn");

constructionBtn.addEventListener("click", () => {
  constructionBtn.classList.add("activeBtnNav");
  miningBtn.classList.remove("activeBtnNav");
  forestBtn.classList.remove("activeBtnNav");
});

miningBtn.addEventListener("click", () => {
  constructionBtn.classList.remove("activeBtnNav");
  miningBtn.classList.add("activeBtnNav");
  forestBtn.classList.remove("activeBtnNav");
});

forestBtn.addEventListener("click", () => {
  constructionBtn.classList.remove("activeBtnNav");
  miningBtn.classList.remove("activeBtnNav");
  forestBtn.classList.add("activeBtnNav");
});

// FILTER FUNCTIONS
// var filter = document.querySelector(".filter");

// function animateShowFilter() {
//   if (filter.style.display === "block") {
//     filter.style.opacity = "0";
//     filter.style.transform = "translateX(100px)";

//     setTimeout(() => {
//       filter.style.display = "none";
//     }, 600);
//   } else {
//     filter.style.display = "block";

//     setTimeout(() => {
//       filter.style.transform = "translateX(0px)";
//       filter.style.opacity = "1";
//     }, 1);
//   }
// }

// MODAL FUNCTIONS
var bgModal = document.querySelector(".bgModal");

function openModal() {
  const modalDetails = document.querySelectorAll(".modalDetails");

  modalDetails.forEach((modalSingle) => {
    modalSingle.style.display = "block";

    setTimeout(() => {
      modalSingle.style.opacity = "1";
    }, 1);
  });
}

function openModalRequest() {
  const modalRequest = document.querySelectorAll(".modalRequest");

  modalRequest.forEach((modalSingleRequest) => {
    modalSingleRequest.style.display = "block";

    setTimeout(() => {
      modalSingleRequest.style.opacity = "1";
    }, 1);
  });
}

const closeModalBtn = document.querySelectorAll(".closeModalBtn");

function closeModal() {
  const modal = document.querySelectorAll(".modal");

  modal.forEach((modalSingleSection) => {
    modalSingleSection.style.transition = "600ms";
    modalSingleSection.style.opacity = "0";

    setTimeout(() => {
      modalSingleSection.style.display = "none";
    }, 600);
  });
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

setTimeout(function () {
  alert(
    "Essa Página se encontra em manutenção, em Breve lhe entregaremos toda a Frota disponível da WPX "
  );
}, 500);
