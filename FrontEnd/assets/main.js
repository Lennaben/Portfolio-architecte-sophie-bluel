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
        console.log(worksContainer)
        worksContainer.innerHTML = ""
        works.map((work) => {
          createFigure(work)
        })
      }
      console.log(works)
    })
    .catch(function (error) {
      console.log(error)
    })
}
getWorks()


function createFigure(work) {
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
