let selectedCateg = "tous"

// 21/02 je vais installé les categories

const urlCategories = "http://localhost:5678/api/categories"

// A REVOIR !!!!!!
//cela nous permet de recuperer les categories avec fetch en passant par l'API categories
// fonction asynchrone = ça permet de continuer l'execution de la page pendant le chargement de la fonction (async)
// await = on attend la validation de tous les AWAIT avant de valider la promesse et retourner  le resulta de la fonction

// dans un 1er temps nous avons fetch
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
const displayCategories = (categories) => {
  const filtersContainer = document.querySelector(".filters-container ")
  // pour chacune des categories, on attache a notre container le resultat de la fonction createFilter
  categories.map((categorie) => {
    filtersContainer.appendChild(createFilter(categorie.name))
  })
}
// cela permet de créer un filter
const createFilter = (categorie) => {
  const filter = document.createElement("button")
  filter.classList.add("filter")
  // data attribu
  filter.dataset.categ = categorie
  filter.addEventListener("click", (e) => {
    selectedCateg = e.target.dataset.categ
    console.log(selectedCateg)
    getWorks()
  })
  filter.innerText = categorie
  return filter
}
getCategories()

//  installation des works

const urlWorks = "http://localhost:5678/api/works"
const worksContainer = document.getElementsByClassName("gallery")[0]

function getWorks() {
  fetch(urlWorks)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let works = data
      if (works.length > 0) {
        console.log("works", data)
        worksContainer.innerHTML = ""
        // faire le filter, cree un new tableau, utiliser le nouveau tableau a la place de map
        // quand in clik sur un btn d'un categ cela vas filter les works
        if (selectedCateg === "tous") {
          // le .map cela sert a parcourir le tableau.
          works.map((work) => {
            createFigure(work)
          })
        } else {
          let filterWorks =
          filterWorks.map((work) => {            
            createFigure(work)
            
          })
          // faire un tableau qui corespond a la categ
          
        }
      }
      console.log(works)
    })
    .catch(function (error) {
      console.log(error)
    })
}
getWorks()

// figure balise HTML pour les image

function createFigure(work) {
  console.log(work)
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
