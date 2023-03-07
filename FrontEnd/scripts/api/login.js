const urlLogin = "http://localhost:5678/api/users/login"

const sendBtn = document.querySelector("#btn-login")

const form = document.querySelector("form")
form.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("hello")
  getLogin()
})

async function getLogin() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const user = {
    email: email,
    password: password,
  }
  

//    poste moi mon user , emballe le en json et envoie le à l'adresse urlLogin, la reponse c'est l'accusé de reception
  let response = await fetch(urlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
   const data = await response.json()
   console.log(data);
//    envoyer le token dans le local storage 
localStorage.setItem("token", JSON.stringify(data.token))
  
}

// document.forms["myform"].submit()
