let filtersElt = document.querySelector(".filters-container")
let adminBarreElt = document.querySelector(".adminBarre")
let modifyLinkContainerElt = document.querySelector(".modifyLinkContainer")
console.log(modifyLinkContainerElt)
console.log(filtersElt)

//Vérifier si il y a le Token dans le localStorage
// console.log(localStorage.getItem("token"))

const token = localStorage.getItem("token")
console.log(token)
if (token) {
  //Si oui, Affcher Barre d'amdmin noir et les bouton modifier, faire disparer les filtrer (display none)

  modifyLinkContainerElt.style.display = "inline"
  adminBarreElt.style.display = "flex"
  filtersElt.style.display = "none"
} else {
  // Si pas connecter
  adminBarreElt.style.display = "none"
  filtersElt.style.display = "flex"
  modifyLinkContainerElt.style.display = "none"
}

// essai 1

// _______________________________________
// // essai 2
// let url = window.login.html;

// if (url.includes ("secret")){
//     const elementAmasquer = document.getElementById("filters-container");

//     elementAmasquer.classList.toggle("hidden");
// }
