
const btnFileImage = document.getElementById("btnFileImage")
const form = document.getElementById("form")
const inputFile = document.getElementById("file")
// recupere l'image
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
  // imgDescription.style.display = "none"
  console.log(preview)
})

//Récupère les valuer des champs (title, image, catégorie) LES VALEURS
// Pour quoi il demande un nombre pour la category et malgré ma requet post j'ai une erreur 401

form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log("Envoyé")

  // message d'eerreur
  const file = document.getElementById("file").files[0]
  const title = document.querySelector(".title-input-modal").value
  const category = document.querySelector(".selectCategory").value
  console.log(file, title, category)
  if (!file || !title || !category) {
    console.log("erreur")
    const errorContainer = document.querySelector(".error-post")
    errorContainer.innerHTML = "Veuillez remplir correctement le formulaire"
    //Affier une erreur dans le HTML
  } else {
    const url = "http://localhost:5678/api/works"

    var modal2 = document.getElementById("uploadModale")
    modal2.style.display = "none"

    var modal = document.getElementById("modal")
    modal.style.display = "none"

    const formData = new FormData()
    formData.append("image", file)
    formData.append("title", title)
    formData.append("category", category)

    const token = JSON.parse(localStorage.getItem("token"))

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // passer directement l'objet FormData
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

const mini = document.querySelectorAll(".miniFigure")
console.log(mini)
// // Example POST method implementation:
// async function postData(url, data) {
//   const token = JSON.parse(localStorage.getItem("token"))
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       // "Content-Type": "multipart/form-data",
//       "Authorization": `Bearer ${token}`,
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   })
//   return response.json() // parses JSON response into native JavaScript objects
// }
