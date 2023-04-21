let selectedCateg = "tous"

//************************************ INSTALLLATION DES WOKS *************************************************

const urlWorks = "http://localhost:5678/api/works"
const worksContainer = document.getElementsByClassName("gallery")[0]

const modalGalleryContainer = document.querySelector(".modal-gallery-container")

// *************************************************************

// BTN LOGIN QUI CHANGE EN LOGOUT EN FONCTION DU TOKEN
// QUAND ON ON CLICK SUR LOGOUT CELA SUPPRIME LE TOKEN DU LOCSTORAGE + REDIRECTION SUR LA PAGE NON CONNECTER

const switchLog = document.querySelector(".switch-log")

token ? (switchLog.innerHTML = "logout") : (switchLog.innerHTML = "login")
if (switchLog.innerHTML == "logout") {
  switchLog.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.href = "./index.html"
  })
}

if (!token) {
  document.querySelector(".modify_group").style.display = "none"
  document.querySelector(".modify_article").style.display = "none"
}
// RECUPERATION DES WORKS + CREATION DES FIGURES GRACE A LA FONCTION CREATFIGURE QUE L'ON REMPLIE GRACE AU MAP SUR LES WORKS QUI ON ETE FETCH

function getWorks(selectedCateg) {
  fetch(urlWorks)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let works = data
      if (works.length > 0) {
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
        modalGalleryContainer.innerHTML = ""
        works.map((work) => createMiniature(work))
      }
      console.log("liste des works", works)
    })
    .catch(function () {
      console.log(error)
    })
}

// ******************************MINI FIGURE**********************************

// CREATION D'UNE BALISE FIGURE CONTENANT UNE IMAGE ET LA DESCRIPTION (FIGCAPTION)

function createFigure(work) {
  const figure = document.createElement("figure")
  const image = new Image()
  figure.id = work.id
  image.src = work.imageUrl
  image.alt = work.title
  const figcaption = document.createElement("figcaption")
  figcaption.innerHTML = work.title
  figure.appendChild(image)
  figure.appendChild(figcaption)
  worksContainer.appendChild(figure)
}

console.log("mon token : ", token)

// -----------------------------CREATION DES MINIFIGURE-------------------------------------------

function createMiniature(work) {
  const icon = document.createElement("i")
  icon.classList.add("fa-solid")
  icon.classList.add("fa-trash-can")
  icon.classList.add("edit-icon")
  icon.addEventListener("click", function () {
    console.log(typeof work.id)
    const token = JSON.parse(localStorage.getItem("token"))

    // METHODE FETCH PERMETANT DE SUPPRIMER UN WORK AU CLICK SUR ME MINI POUBELLE
    fetch(`http://localhost:5678/api/works/${work.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          const figure = document.getElementById(work.id)
          if (figure) {
            figure.remove()
          }
        } else {
          throw new Error("Failed to delete image from API")
        }
      })
      .catch((error) => {
        console.error(error)
      })
  })

  // CREATION DES MINIFIGURE

  const figure = document.createElement("figure")
  figure.id = work.id
  figure.classList.add("miniFigure")

  const image = new Image()
  image.src = work.imageUrl
  image.classList.add("miniImage")

  const figcaption = document.createElement("figcaption")
  figcaption.innerHTML = "éditer"
  figcaption.classList.add("figEdit")

  figure.appendChild(icon)
  figure.appendChild(image)
  figure.appendChild(figcaption)
  modalGalleryContainer.appendChild(figure)
}
// -----------------------------------------CATEGORIES-----------------------------------
//cela nous permet de récupérer les catégories avec fetch en passant par l'API catégories
// fonction asynchrone = ça permet de continuer l'exécution de la page pendant le chargement de la fonction (async)
// await = on attend la validation de tous les AWAIT avant de valider la promesse et retourner  le résultat de la fonction

const urlCategories = "http://localhost:5678/api/categories"

// OBETENIR LA LISTE DES CATEGORIES GRACE A L'API
const getCategories = async () => {
  const data = await fetch(urlCategories)
  const response = await data.json()
  console.log(response)

  // ON COPIE LA REPONSE DE L'API DANS LE TABLEAU
  const arr = [...response]
  const select = document.querySelector("#list_deroulante")
  arr.map((item) => {
    getOptions(item, select)
  })

  // ON AJOUT LA CATEGORIES "TOUS", AU DEBUT DE NOTRE TABLEAU 5 UNSHFIT + PERMET D'AJOUTER UN ELEMENT AU DEBUT D'UN TABLEAU
  arr.unshift({ id: 0, name: "Tous" })

  // ON APPEL NOTRE FONCTION POUR AFFICHER LES CATEGORIES EN LUI DONNANT NOTRE TABLEAU, QUI CONTIENT LES CATEGORES
  displayCategories(arr)
}
// AFFICHAGE DES CATEGORIES
const filtersContainer = document.querySelector(".filters-container ")

const displayCategories = (categories) => {
  // POUR CHACUNE DE CATEGORES, ON ATTACHE A NOTRE CONTAINER LE RESULTAT DE LA FONCTION CREATFILTER
  categories.map((categorie) => {
    filtersContainer.appendChild(createFilter(categorie.name))
  })
}

// *****************************BOUTON FILTRES******************************

// CREATION DES BOUTONS FILTRE
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

// ON FILTRE LES DATA PAR CATEGORIES
const filterDatas = (works) => {
  const filtered = works.filter((work) => work.category.name === selectedCateg)
  return filtered
}

// ON APPEL NOTRE FONCTION POUR OBTNEIR MES FILTRES
getCategories()
// POUR AFFICHER TOUS LES WORKS PAR DEFAUTS
getWorks("Tous")

//***************************FENETRE MODAL**********************************

// Sélectionner le bouton "Modifier"
var modifierBtn = document.getElementById("modifier")

// Sélectionner la fenêtre modale
var modal = document.getElementById("modal")

// Sélectionner le bouton de fermeture de la fenêtre modale
var closeBtn = document.getElementsByClassName("close")[0]

// Ajouter un événement au clic sur le bouton "Modifier"
modifierBtn.onclick = function () {
  modal.style.display = "flex" // Afficher la fenêtre modale
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
//------------------------------------------- 2EME FENETRE MODAL--------------------------
// AFFCIHER OUI OU NON LA FENETRE MODAL
var modal2 = document.getElementById("uploadModale")
var btn2 = document.querySelector(".btn-modal")
var span2 = document.getElementsByClassName("close")[1]

btn2.onclick = function () {
  modal2.previousElementSibling.style.display = "none"
  modal2.style.display = "flex"
}

span2.onclick = function () {
  modal2.style.display = "none"
}

window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none"
  }
}
// PERMET D'OBETENIR TOUTE LES OPTIONS POUR LE MENUS SELECTE
function getOptions(item, select) {
  const option = document.createElement("option")
  option.value = item.id
  option.innerText = item.name
  option.classList.add("optionCategory")
  console.log(item.name)
  select.appendChild(option)
}
// AFFICHER LE PREVIEW DE L'IMAGE
function previewImage() {
  var file = document.getElementById("file").files
  if (file.length > 0) {
    var fileReader = new FileReader()

    fileReader.onload = function (event) {
      document
        .getElementById("preview")
        .setAttribute("src", event.target.result)
    }

    fileReader.readAsDataURL(file[0])
  }
}
// AFFICHER L'IMAGE DANS LA MODAL
function displayImage() {
  var input = document.getElementById("image")
  var container = document.getElementById("imageContainer")

  if (input.files && input.files[0]) {
    var reader = new FileReader()

    reader.onload = function (e) {
      container.innerHTML = "<img src=" + e.target.result + '">'
    }

    reader.readAsDataURL(input.files[0])
  }
}

// _______________________________________________________________________________________________
