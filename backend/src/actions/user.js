// LIBRAIRIES
import bcrypt, { hash } from "bcrypt"

// UTILITIES
import { db } from "../database.js"
import { RecordNotFoundError } from "../errors/RecordNotFoundError.js"

export function newUser(req, res) {
    return res.view('/templates/views/user/user_new.ejs')
}

export async function createUser(req, res) {
    const {login , password} = req.body

    const salt = 10
    const password_hash = await hash(password, salt)

    try {
        db.prepare('INSERT INTO users(login, password_hash) VALUES(?, ?)')
        .run(
            login,
            password_hash
        )
        const user = db.prepare('SELECT * FROM users WHERE login = ?').get(login)
        req.session.set('user', 
        {
            id: user.id,
            login
        })
        return res.send(JSON.stringify({"ok":"user create"}))
    } catch (err) {
        return res.send(err)
    }
}

export function successRegister(req, res) {
    return res.view('/templates/views/user/success_register.ejs')
}

export async function login(req, res) {
    const {login, password} = req.body
    const user = db.prepare("SELECT * FROM users WHERE login = ?").get(login)
    if (user) {
        const isValid = await bcrypt.compare(password, user.password_hash)
        if (isValid)
        {
            req.session.set('user', {
                id: user.id,
                username: user.username
            })
            return res.send(JSON.stringify(user))
        }
    }
    throw new Error("utilisateur Introuvable")
}

export function logout(req, res) {
    req.session.delete()
}