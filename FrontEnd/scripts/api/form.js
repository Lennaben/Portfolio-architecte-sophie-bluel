// const { options } = require("../../../Backend/app")

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
  const url = "http://localhost:5678/api/works"
  const fileInputElement = document.getElementById("file")

  // console.log(
  //   fileInputElement.files[0],
  //   document.querySelector(".title-input-modal").value,
  //   document.querySelector(".selectCategory").value
  // )

  const formData = new FormData()
  formData.append("image", fileInputElement.files[0])
  formData.append("title", document.querySelector(".title-input-modal").value)
  formData.append("category", document.querySelector(".selectCategory").value)

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
