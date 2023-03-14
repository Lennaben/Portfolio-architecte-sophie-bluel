let selectedCateg = "tous"

// 21/02 je vais installé les categories

const urlCategories = "http://localhost:5678/api/categories"

// dans un 1er temps nous avons fetch

const token = localStorage.getItem("token")

// Faire une fonction de tri
// actualiser les resuitats en fonction du filtre

//  installation des works

const urlWorks = "http://localhost:5678/api/works"
const worksContainer = document.getElementsByClassName("gallery")[0]

function getWorks(selectedCateg) {
  fetch(urlWorks)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let works = data
      if (works.length > 0) {
        // console.log("works", data)
        worksContainer.innerHTML = ""
        if (selectedCateg === "Tous") {
          console.log("selected tag case : ", selectedCateg)
          works.map((work) => {
            createFigure(work)
          })
        } else {
          console.log("selected tag case : ", selectedCateg)
          const filteredDatas = filterDatas(works)
          console.log("tableau de nos data filtrées ", filteredDatas)
          filteredDatas.map((work) => {
            createFigure(work)
          })
        }
        ;("")
      }
      console.log("liste des works", works)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// Créer une balise figure contenant une image et une description(figcaption)

function createFigure(work) {
  // console.log(work)
  const figure = document.createElement("figure")
  const image = new Image()
  image.src = work.imageUrl
  image.alt = work.title
  const figcaption = document.createElement("figcaption")
  figcaption.innerHTML = work.title
  figure.appendChild(image)
  figure.appendChild(figcaption)
  worksContainer.appendChild(figure)
}

// *********************************** CATEGORIES **********************************************
// A REVOIR !!!!!!
//cela nous permet de recuperer les categories avec fetch en passant par l'API categories
// fonction asynchrone = ça permet de continuer l'execution de la page pendant le chargement de la fonction (async)
// await = on attend la validation de tous les AWAIT avant de valider la promesse et retourner  le resulta de la fonction

// Obtenir la liste des catégories
const getCategories = async () => {
  const data = await fetch(urlCategories)
  const response = await data.json()
  console.log(response)

  //  on copie dans un tableau la reponse de l'API
  const arr = [...response]
  //on ajoute la categories Tous, au debut de notre tableau (unshift = permet d'ajouter un element au debut d'un tableau)
  arr.unshift({ id: 0, name: "Tous" })
  console.log(arr)
  // on appel notre fonction pour afficher les categories en lui passant notre tableau, qui contient les categories
  displayCategories(arr)
  // return response.datas
}

// afficher les categories
const filtersContainer = document.querySelector(".filters-container ")
token
  ? (filtersContainer.style.display = "none")
  : (filtersContainer.style.display = "flex")


const displayCategories = (categories) => {
  // pour chacune des categories, on attache a notre container le resultat de la fonction createFilter
  categories.map((categorie) => {
    filtersContainer.appendChild(createFilter(categorie.name))
  })
}

// Créer un bouton filtre
const createFilter = (categorie) => {
  const filter = document.createElement("button")
  filter.classList.add("filter")
  filter.dataset.categ = categorie
  filter.addEventListener("click", (e) => {
    selectedCateg = e.target.dataset.categ
    console.log("fonction createFilter", selectedCateg)

    getWorks(selectedCateg)
  })
  filter.innerText = categorie
  return filter
}

// Filtrer des datas par catégories
const filterDatas = (works) => {
  const filtered = works.filter((work) => work.category.name === selectedCateg)
  return filtered
}

// appel de notre fonction pour obtenir les filtres
getCategories()
getWorks("Tous")

// fentere modal

// faire une fonction pour afficher la modale
// faire un addEventListener sur le btn modifier
// et lancer la fonction au clik

// Sélectionner le bouton "Modifier"
var modifierBtn = document.getElementById("modifier")

token
  ? (modifierBtn.style.display = "bloc")
  : (modifierBtn.style.display = "none")

// Sélectionner la fenêtre modale
var modal = document.getElementById("modal")

// Sélectionner le bouton de fermeture de la fenêtre modale
var closeBtn = document.getElementsByClassName("close")[0]

// Ajouter un événement au clic sur le bouton "Modifier"
modifierBtn.onclick = function () {
  modal.style.display = "block" // Afficher la fenêtre modale
}

// Ajouter un événement au clic sur le bouton de fermeture de la fenêtre modale
closeBtn.onclick = function () {
  modal.style.display = "none" // Masquer la fenêtre modale
}

// Ajouter un événement pour fermer la fenêtre modale lorsque l'utilisateur clique en dehors de la fenêtre modale
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none" // Masquer la fenêtre modale
  }
}

// _____________________________________________________________________

// <!-- btn supprimer  -->
function supprimerElement(element) {
  element.parentNode.remove()
}


const adminNav = document.querySelector(".adminBarre")

token
  ? (adminNav.style.display = "bloc")
  : (adminNav.style.display = "none")
