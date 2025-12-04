import { db } from '../database.js'
import { RecordNotFoundError } from '../errors/RecordNotFoundError.js'

export function listProjects(req, res) {
	const {id} = req.session.get('user')
	const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id)
	const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all()

	res.view('templates/index.ejs', {
		projects,
		user
	})
}

export function newProject(req,res) {
	res.view('templates/views/project/project_new.ejs')
}

export function createProject(req, res) {
	db.prepare('INSERT INTO projects(user_id, title, description, deadline) VALUES (?, ?, ?, ?)')
	.run(
		7,
		req.body.title,
		req.body.description,
		req.body.deadline
	)
	return res.redirect('/')
}

export function deleteProject(req, res) {
	const id = req.params.id

	const project = db.prepare('DELETE FROM projects WHERE id = ?').run(id)

	if (project === undefined)
		{
			throw new RecordNotFoundError(`Impossible de trouver l'id ${id}`)
		}
	res.redirect('/')
}

export function showProject(req, res) {
	const id = req.params.id

	const project = db.prepare('SELECT * FROM projects where id = ?').get(id)
	if (project === undefined) {
		throw new RecordNotFoundError(`Impossible de trouver l'id ${id}`);
	}
	res.view('templates/views/project/project_view.ejs', {
		project
	})
}