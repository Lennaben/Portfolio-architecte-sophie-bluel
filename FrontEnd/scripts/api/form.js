const btnFileImage = document.getElementById("btnFileImage")
const form = document.getElementById("form")
const inputFile = document.getElementById("file")
// recupere l'image
const preview = document.getElementById("preview")
const imgDescription = document.querySelector(".imgDescription")
const blockUpload = document.querySelector(".blockUpload")





console.log(btnFileImage, form, inputFile)

btnFileImage.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("Je clique sur le btn")
 
  inputFile.click()
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log("Envoyé")

  //Récupère les valuer des champs (title, image, catégorie) LES VALEURS

  //FormData  a ec les valuer des champts

  //FETCH methode post URL voir mission + Token dans headers autorizahion + Les donnée form data
})

// faire disparaitre le btn upload lorsque l'image est afficher


// const btnUploadImage = document.getElementById("btnUploadImage")

preview.addEventListener("load", function () {
  preview.style.display = 'block'
  btnFileImage.style.display = "none"
  imgDescription.style.display = "none"
  blockUpload.style.display = "none"
  // imgDescription.style.display = "none"
  console.log(preview)
})
