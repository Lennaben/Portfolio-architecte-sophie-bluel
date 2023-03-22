let selectedCateg = "tous"

// 21/02 je vais installé les categories

const urlCategories = "http://localhost:5678/api/categories"

// dans un 1er temps nous avons fetch

// Faire une fonction de tri
// actualiser les resuitats en fonction du filtre

//  installation des works

const urlWorks = "http://localhost:5678/api/works"
const worksContainer = document.getElementsByClassName("gallery")[0]

const modalGalleryContainer = document.querySelector(".modal-gallery-container")

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
        works.map((work) => createMiniature(work))
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

//  <div class="miniFigure">
//    <div>
//      <i class="fa-regular fa-pen-to-square edit-icon"></i>
//      <img
//        src="http://localhost:5678/images/appartement-paris-v1651287270508.png"
//        class="miniImage"
//      />
//    </div>
//    <p class="figEdit">éditer</p>
//  </div>

function createMiniature(work) {
  const icon = document.createElement("i")
  icon.classList.add("fa-regular")
  icon.classList.add("fa-pen-to-square")
  icon.classList.add("edit-icon")

  console.log(icon)

  const figure = document.createElement("figure")
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
  const select = document.querySelector("#list_deroulante")
  arr.map((item) => {
    getOptions(item, select)
  })
  //on ajoute la categories Tous, au debut de notre tableau (unshift = permet d'ajouter un element au debut d'un tableau)
  arr.unshift({ id: 0, name: "Tous" })
  console.log(arr)
  // on appel notre fonction pour afficher les categories en lui passant notre tableau, qui contient les categories
  displayCategories(arr)
  // return response.datas
}

// afficher les categories
const filtersContainer = document.querySelector(".filters-container ")

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

var modal2 = document.getElementById("myModal2")
var btn2 = document.getElementById("openModal2")
var span2 = document.getElementsByClassName("close")[1]

btn2.onclick = function () {
  modal2.style.display = "block"
}

span2.onclick = function () {
  modal2.style.display = "none"
}

window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none"
  }
}

var modal3 = document.getElementById("myModal3")
var btn3 = document.getElementById("openModal3")
var span3 = document.getElementsByClassName("close")[2]

btn3.onclick = function () {
  modal3.style.display = "block"
}

span3.onclick = function () {
  modal3.style.display = "none"
}

window.onclick = function (event) {
  if (event.target == modal3) {
    modal3.style.display = "none"
  }
}

function getOptions(item, select) {
  const option = document.createElement("option")
  option.value = item.name
  option.innerText = item.name
  option.classList.add("optionCategory")
  console.log(item.name)
  select.appendChild(option)
}

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


function displayImage() {
  var input = document.getElementById("image")
  var container = document.getElementById("imageContainer")

  if (input.files && input.files[0]) {
    var reader = new FileReader()

    reader.onload = function (e) {
      container.innerHTML = '<img src="' + e.target.result + '">'
    }

    reader.readAsDataURL(input.files[0])
  }
}

// recuprer les donne du formulaire, info des input 
// faire un fest post pour poster l'image sur le serveur 


