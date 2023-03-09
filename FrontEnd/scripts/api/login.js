const urlLogin = "http://localhost:5678/api/users/login"

// const sendBtn = document.querySelector("#btn-login")

const btnLog = document.querySelector("#btn-login")
btnLog.addEventListener("click", (e) => {
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

  // console.log(isValidEmail(email))

  // if (!isValidEmail(email)) {
  //   emailErrorMessage.innerHTML = "Veuillez entrer une adresse email valide."
  //   // on l'affiche
  //   emailErrorMessage.style.display = "block"
  // } else {
  //   emailErrorMessage.innerHTML = ""
  //   emailErrorMessage.style.display = "none"
  // }

  // if (!isPasswordValid(password)) {
  //   passwordErrorMessage.innerHTML = "Veuillez entrer un password valide."
  //   passwordErrorMessage.style.display = "block"
  // } else {
  //   passwordErrorMessage.innerHTML = ""
  //   passwordErrorMessage.style.display = "none"
  if (isValidEmail(email) && isPasswordValid(password)) {
    //    poste moi mon user , emballe le en json et envoie le à l'adresse urlLogin, la reponse c'est l'accusé de reception
    let response = await fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response.ok) {
      console.log("envoyé")
      const data = await response.json()
      console.log(data)
      // envoyer le token dans le local storage
      localStorage.setItem("token", JSON.stringify(data.token))
      window.location.href = "index.html"
    } else {
      console.log("pas envoyé")
      alert("Utilisateur non trouvé")
    }
  }
}

// mettre un message d'erreur si les champs ne sont pas correcte

// if (!isValidEmail(email)) {
//   emailErrorMessage.innerHTML = "Veuillez entrer une adresse email valide."
//   emailErrorMessage.style.display = "block"
// } else {
//   // Validation réussie
//   emailErrorMessage.innerHTML = " "
//   emailErrorMessage.style.display = "none"
// }

function isValidEmail(email) {
  const emailErrorMessage = document.getElementById("email-error-message")
  // Vérifier si l'email est valide, par exemple :
  const test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!test) {
    emailErrorMessage.innerHTML = "Veuillez entrer une adresse email valide."
    // on l'affiche
    emailErrorMessage.style.display = "block"
    return false
  } else {
    emailErrorMessage.innerHTML = ""
    emailErrorMessage.style.display = "none"
    return true
  }
}

function isPasswordValid(password) {
  const passwordErrorMessage = document.getElementById("password-error-message")

  const test = /^(?=.*[a-z].*[a-z].*[a-z])(?=.*\d).{5,}$/.test(password)

  if (!test) {
    passwordErrorMessage.innerHTML = "Veuillez entrer un password valide."
    passwordErrorMessage.style.display = "block"
    return false
  } else {
    passwordErrorMessage.innerHTML = ""
    passwordErrorMessage.style.display = "none"
    return true
  }
}
