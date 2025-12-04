import fastify from "fastify";

// PLUGIN
import fastifyView from "@fastify/view";
import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import fastifySecureSession from "@fastify/secure-session";
import ejs from 'ejs'

// UTILITIES
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path"
import { readFileSync } from "node:fs";
import { createProject, deleteProject, listProjects, newProject, showProject } from "./actions/projects.js";
import { createUser, login, newUser, successRegister } from "./actions/user.js";
import { RecordNotFoundError } from "./errors/RecordNotFoundError.js";

const app = fastify();
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

// REGISTER MODULES
app.register(fastifySecureSession, {
  sessionName: 'session',
  cookieName: 'my-session-cookie',
  key: readFileSync(join(rootDir, 'secret-key')),
  expiry: 24 * 60 * 60, // Default 1 day
  cookie: {path: '/'}
})
app.register(fastifyFormbody)
app.register(fastifyView, {engine: {ejs}})
app.register(fastifyStatic, {root: join(rootDir, 'public')})

// user request
app.get('/new_user', newUser)
app.get ('/success_register', successRegister)
app.post('/create_user', createUser)
app.get('/login', login)
app.post('/login', login)

// project request
app.get('/', listProjects)
app.get('/project/:id', showProject)
app.get('/new_project', newProject)
app.post('/project/:id/delete', deleteProject)
app.post('/new_project', createProject)

// ERROR HANDLER
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
