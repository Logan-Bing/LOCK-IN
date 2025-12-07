import { ListProjects } from "./actions/project.js";
import { Home } from "./actions/home.js";
import { Register, Login, Logout } from "./auth/auth.js";
import { Navbar } from "./shared/navbar.js";

const routes = {
    '/register': Register,
    '/login': Login,
    '/logout': Logout,
    '/': Home,
    '/projects': ListProjects,
}

const auth_path = ['/login', '/logout', '/register']

const current_path = window.location.pathname

export async function createApp(root) {
    const page = await routes[current_path]()
    if (!auth_path.includes(current_path))
        root.appendChild(Navbar())
    root.appendChild(page)
}