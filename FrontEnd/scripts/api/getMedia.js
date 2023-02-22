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
