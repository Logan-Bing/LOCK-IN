import { listProjects } from "./actions/project.js";

export async function createApp(root) {
    const page = await listProjects()
    root.innerHml = ''
    root.appendChild(page)
}