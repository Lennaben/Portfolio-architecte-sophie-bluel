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
  const filtersContainer = document.querySelector(".filters")
  // pour chacune des categories, on attache a notre container le resultat de la fonction createFilter 
  categories.map((categorie) => {
    filtersContainer.appendChild(createFilter(categorie.name)) 
  })
}
// cela permet de créer un filter 
const createFilter = (categorie) => {
  const filter = document.createElement("button")
  filter.classList.add("filters")
  filter.innerText = categorie
  return filter
}
getCategories()
