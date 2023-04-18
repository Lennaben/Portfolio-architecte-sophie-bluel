// GESTION DE L'AFFICHAGE DE LA BARRE NOIR
let filtersElt = document.querySelector(".filters-container")
let adminBarreElt = document.querySelector(".adminBarre")
let modifyLinkContainerElt = document.querySelector(".modifyLinkContainer")
console.log(modifyLinkContainerElt)
console.log(filtersElt)

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
