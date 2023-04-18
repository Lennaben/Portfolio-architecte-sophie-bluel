// RECUPERATION DE L'API
const urlLogin = "http://localhost:5678/api/users/login"
//SELECTION DU BOUTON POUR SE CONNECTER AU CLICK EVETEMENT => ON SE CONNECTE
const btnLog = document.querySelector("#btn-login")
btnLog.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("hello")
  getLogin()
})
// FONCTION QUI PERMET DE 
async function getLogin() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const user = {
    email: email,
    password: password,
  }

  if (isValidEmail(email) && isPasswordValid(password)) {
    // ON POSTE LE USER LE JSON L'ENVOI A L'ADRESSE URLLOGIN, LA REPONSE = L'ACCUSE DE RECEPTION 
    let response = await fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    // SI REPONSE OK ON SE CONNECTE 
    if (response.ok) {
      console.log("envoyé")
      const data = await response.json()
      console.log(data)
      // ENVOI DU TOKEN DANS LE LOCAL STORAGE     
      localStorage.setItem("token", JSON.stringify(data.token))
      window.location.href = "index.html"
      // SINON MESSAGE D'ERREUR ET ON SE CONNECTE PAS 
    } else {
      console.log("pas envoyé")
      alert("Utilisateur non trouvé")
    }
  }
}

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
