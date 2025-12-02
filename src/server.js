import fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path"
import ejs from 'ejs'

const app = fastify();

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

app.register(fastifyView, {
	engine: {
		ejs
	}
})

app.register(fastifyStatic, {
	root: join(rootDir, 'public')
})

const posts = [
	{
		title: "Mon premier article"
	},
	{
		title: "Mon deuxieme article"
	}
]

app.get('/', (req, res) => {
	res.view('templates/index.ejs', {
		posts
	})
})

async function  start () {
	try {
		await app.listen({port: 3000})
	}
	catch (err)
	{
		console.error(err)
		process.exit(-1)
	}
}
start()
