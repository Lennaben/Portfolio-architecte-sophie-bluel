const btnFileImage = document.getElementById("btnFileImage")
const form = document.getElementById("form")
const inputFile = document.getElementById("file")

console.log(btnFileImage, form, inputFile)

btnFileImage.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("Je cloque sur le byn")
  inputFile.click()
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log("Envoyé")

  //Récupère les valuer des champs (title, image, catégorie) LES VALEURS

  //FormData  a ec les valuer des champts

  //FETCH methode post URL voir mission + Token dans headers autorizahion + Les donnée form data
})
