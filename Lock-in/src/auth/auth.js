import { callApi } from "../services/api.js"

export function Register() {
    const section = document.createElement('section')
    section.innerHTML =
    `
    <div class="container">
        <div class="error_container alert alert-danger d-none">Veuillez completer les champs</div>
        <h1>S'inscrire</h1>
        <form id="loginForm" action="" method="post">
            <div class="mb-2">
                <label for="login">Login</label>
                <input type="text" id="login" class="form-control" name="login">
            </div>
            <div class="mb-2">
                <label for="password">Password</label>
                <input name="password" class="form-control" id="password">
            </div> 
            <button class="mb-4 btn btn-primary">S'inscrire</button>
        </form>
        <p>Deja un compte ?</p>
        <a href="/login" class="btn btn-secondary">Se Connecter</a>
    </div> 
    `

    const form = section.querySelector("#loginForm")
    
    form.addEventListener( "submit", async(e) => {
        e.preventDefault()

        const body = {
            login: form.login.value,
            password: form.password.value
        }

        const userCreate = await callApi('register', body)
        if (!userCreate.ok) {
            section.querySelector(".error_container").classList.remove("d-none")
            return ;
        }
        window.location.href = window.location.origin
    })
    return section
} 

export function Login() {
    const section = document.createElement('section')
    section.innerHTML = 
    `
    <div class="container">
        <div class="error_container alert alert-danger d-none">Login ou Mot de passe incorrect</div>
        <h1>Se connecter</h1>
        <form id="loginForm" action="" method="post">
            <div class="mb-2">
                <label for="login">Login</label>
                <input type="text" id="login" class="form-control" name="login">
            </div>
            <div class="mb-2">
                <label for="password">Password</label>
                <input name="password" class="form-control" id="password">
            </div> 
            <button class="mb-4 btn btn-primary">Connexion</button>
        </form>
        <p>Créer un compte</p>
        <a href="/register" class="btn btn-secondary">S'inscire</a>
    </div> 
    `
    const form = section.querySelector("#loginForm")
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const body = {
            login: form.login.value,
            password: form.password.value
        }

        const isUser = await callApi('login', body)
        if (!isUser.ok) {
            section.querySelector(".error_container").classList.remove("d-none")
            return ;
        }

        window.location.href = window.location.origin
    })
    return section
}

export async function Logout() {
    const isLogout = await callApi('logout')
    if (!isLogout.ok) {
       alert("Impossible de se deconnecter")
    }
    window.location.pathname = '/login'
}