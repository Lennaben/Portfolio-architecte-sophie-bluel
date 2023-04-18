// RECUPERATION DES ELEMENTS DU FORMULAIRE POUR ENVOYER UNE IMAGE 
const btnFileImage = document.getElementById("btnFileImage")
const form = document.getElementById("form")
const inputFile = document.getElementById("file")
const preview = document.getElementById("preview")
const imgDescription = document.querySelector(".imgDescription")
const blockUpload = document.querySelector(".blockUpload")
const iconImg = document.querySelector(".icon-img")

console.log(btnFileImage, form, inputFile)

btnFileImage.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("Je clique sur le btn")
  inputFile.click()
})

preview.addEventListener("load", function () {
  preview.style.display = "block"
  btnFileImage.style.display = "none"
  imgDescription.style.display = "none"
  blockUpload.style.display = "none"
  iconImg.style.display = "none"
  console.log(preview)
})

// RECUPERATION DES VALEURS DES INPUTS TITLE,IMAGE,CATEGORIES ET ENVOI DU FORMULAIRE VERS LE BACKEND 
form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log("Envoyé")

// MESSAGE D'ERREUR DE LA MODAL
  const file = document.getElementById("file").files[0]
  const title = document.querySelector(".title-input-modal").value
  const category = document.querySelector(".selectCategory").value
  console.log(file, title, category)

  // SI IL Y A UNE ERREUR ON AFFICHE LE MESSAGE D'ERREUR
  if (!file || !title || !category) {
    console.log("erreur")
    const errorContainer = document.querySelector(".error-post")
    errorContainer.innerHTML = "Veuillez remplir correctement le formulaire"
    // SINON ON FETCH LES DONNES AVEC LA METHODES POSTE
  } else {
    const url = "http://localhost:5678/api/works"

    var modal2 = document.getElementById("uploadModale")
    modal2.style.display = "none"

    var modal = document.getElementById("modal")
    modal.style.display = "none"


    //  ON CREE UN OBBJECT FORM DATA QUI VAS CONTENIR LES INFOS DONT LE BACKEND A BESOIN POUR POSTER LE WORK
    const formData = new FormData()
    formData.append("image", file)
    formData.append("title", title)
    formData.append("category", category)
    // ON RECUPER LE TOKEN
    const token = JSON.parse(localStorage.getItem("token"))
    // ON POST L'URL LE FORM DATA AVEC NOTRE TOKEN POUR L'AUTORISATION
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        getWorks("Tous")
      })
      .catch((error) => {
        console.error(error)
      })
  }
})

// const mini = document.querySelectorAll(".miniFigure")
// console.log(mini)
