import fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path"
import { createProject, deleteProject, listProjects, NewProject, showProject } from "./actions/projects.js";
import ejs from 'ejs'
import { RecordNotFoundError } from "./errors/RecordNotFoundError.js";

const app = fastify();
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

app.register(fastifyFormbody)
app.register(fastifyView, {engine: {ejs}})
app.register(fastifyStatic, {root: join(rootDir, 'public')})

app.get('/', listProjects)
app.get('/project/:id', showProject)
app.get('/new_project', NewProject)
app.post('/project/:id/delete', deleteProject)
app.post('/new_project', createProject)

app.setErrorHandler((error, req, res) => {
	if (error instanceof RecordNotFoundError) {
		res.statusCode = 404
		return res.view('templates/404.ejs', {
			error
		})
	}
	console.log(error)
	res.statusCode = 500
	return {
		error: error.message
	}
})

async function  start () {
	try {
		await app.listen({
			port: 3000
		})
	}
	catch (err)
	{
		console.error(err)
		process.exit(-1)
	}
}
start()
