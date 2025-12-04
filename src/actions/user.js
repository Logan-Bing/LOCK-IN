// LIBRAIRIES
import bcrypt, { hash } from "bcrypt"

// UTILITIES
import { db } from "../database.js"

export function newUser(req, res) {
    return res.view('/templates/views/user/user_new.ejs')
}

export async function createUser(req, res) {
    const {login , password} = req.body

    const salt = 10
    const password_hash = await hash(password, salt)

    db.prepare('INSERT INTO users(login, password_hash) VALUES(?, ?)')
    .run(
        login,
        password_hash
    )
    return res.redirect('/success_register')
}

export function successRegister(req, res) {
    return res.view('/templates/views/user/success_register.ejs')
}

export async function login(req, res) {
    const params = {}
    if (req.method === "POST") {
        const {login, password} = req.body
        params.login = login
        const user = db.prepare("SELECT * FROM users WHERE login = ?").get(login)
        if (user) {
            const isValid = await bcrypt.compare(password, user.password_hash)
            if (isValid) 
            {
                req.session.set('user', {
                    id: user.id,
                    username: user.username
                })
                res.redirect('/')

            }
        }
        params.error = "Identifiants ou mot de passe incorect"
    }
    return res.view('/templates/views/user/user_login.ejs', params)
} 