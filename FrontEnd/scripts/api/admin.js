// GESTION DE L'AFFICHAGE DE LA BARRE NOIR
let filtersElt = document.querySelector(".filters-container")
let adminBarreElt = document.querySelector(".adminBarre")
let modifyLinkContainerElt = document.querySelector(".modifyLinkContainer")
console.log(modifyLinkContainerElt)
console.log(filtersElt)

const token = localStorage.getItem("token")
console.log(token)
if (token) {
  // SI OUI, ( PRESENCE DU TOKEN) AFFICHER LA BARRE NOIR SINON LA FAIRE DISPARAITRE = NOUS SERONS DECONNECTER 


  modifyLinkContainerElt.style.display = "inline"
  adminBarreElt.style.display = "flex"
  filtersElt.style.display = "none"
} else {
  // Si pas connecter
  adminBarreElt.style.display = "none"
  filtersElt.style.display = "flex"
  modifyLinkContainerElt.style.display = "none"
}
