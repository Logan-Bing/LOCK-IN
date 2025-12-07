import fastify from "fastify";

// PLUGIN
import fastifyView from "@fastify/view";
import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import fastifySecureSession from "@fastify/secure-session";
import ejs from 'ejs'
import cors from "@fastify/cors";

// UTILITIES
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path"
import { readFileSync } from "node:fs";
import { createProject, deleteProject, listProjects, newProject, sendProjects, showProject } from "./actions/projects.js";
import { createUser, login, logout, newUser, successRegister } from "./actions/user.js";
import { RecordNotFoundError } from "./errors/RecordNotFoundError.js";

const app = fastify();
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))


const schema = {
	schema: {
		body: {
			content: {
				'application/json' : {
					schema: {type: 'object'}
				}
			}
		}
	}
}

// REGISTER MODULES
app.register(fastifySecureSession, {
  sessionName: 'session',
  cookieName: 'my-session-cookie',
  key: readFileSync(join(rootDir, 'secret-key')),
  expiry: 24 * 60 * 60, // Default 1 day
  cookie: {path: '/'}
})
await app.register(cors, 
	{ 
		origin: 'http://localhost:5173',
		credentials: true
	}

);
app.register(fastifyFormbody)
app.register(fastifyView, {engine: {ejs}})
app.register(fastifyStatic, {root: join(rootDir, 'public')})

// user request
app.get('/new_user', newUser)
app.get ('/success_register', successRegister)
app.post('/register', createUser)
app.post('/logout', logout)
app.post('/login', schema, login)

// project request
app.get('/projects', sendProjects)
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
	reply.code(500).send({
		error: "Internal Error",
		message: "Une erreur est survenue"
	})
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
