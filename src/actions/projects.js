import { db } from '../database.js'
import { RecordNotFoundError } from '../errors/RecordNotFoundError.js'

export function listProjects(req, res) {
	const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all()

	res.view('templates/index.ejs', {
		projects
	})
}

export function NewProject(req,res) {
	res.view('templates/views/project_new.ejs')
}

export function createProject(req, res) {
	db.prepare('INSERT INTO projects(user_id, title, description, deadline) VALUES (?, ?, ?, ?)')
	.run(
		2,
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
	res.view('templates/views/project_view.ejs', {
		project
	})
}