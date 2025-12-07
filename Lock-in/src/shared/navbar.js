export function Navbar()
{
    const navbar = document.createElement('nav')
    navbar.innerHTML = `
        <ol>
            <li><a href="/">HOME</a></li>
            <li><a href="/projects">PROJECTS</a></li>
            <li><a href="/login">DECONNEXION</a></li>
        </ol>
    `
    return navbar
}
