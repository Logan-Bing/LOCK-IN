import { db } from '../database.js'
import { RecordNotFoundError } from '../errors/RecordNotFoundError.js'

export function listProjects(req, res) {
	const {id} = req.session.get('user')
	const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id)
	const projects = db.prepare('SELECT * FROM projects WHERE user_id = ?').all(id)

	res.view('/templates/views/project/projects_list.ejs', {
		projects,
		user
	})
}

export function sendProjects(req, res) {
	const {id, login} = req.session.get('user')
	const projects = db.prepare('SELECT * FROM projects WHERE user_id = ?').all(id)
	return res.send(JSON.stringify(projects))
}

export function newProject(req,res) {
	res.view('templates/views/project/project_new.ejs')
}

export function createProject(req, res) {
	const {id} = req.session.get('user')
	const {title, description, deadline} = req.body
	db.prepare('INSERT INTO projects(user_id, title, description, deadline) VALUES (?, ?, ?, ?)')
	.run(
		id,
		title,
		description,
		deadline
	)
	return res.redirect('/projects')
}

export function deleteProject(req, res) {
	const id = req.params.id

	const project = db.prepare('DELETE FROM projects WHERE id = ?').run(id)

	if (project === undefined)
		{
			throw new RecordNotFoundError(`Impossible de trouver l'id ${id}`)
		}
	res.redirect('/projects')
}

export function showProject(req, res) {
	const id = req.params.id

	const project = db.prepare('SELECT * FROM projects where id = ?').get(id)
	if (project === undefined) {
		throw new RecordNotFoundError(`Impossible de trouver l'id ${id}`);
	}
	return project
}




