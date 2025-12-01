import fastify from "fastify";

const app = fastify()

async function start () {
    try {
        await app.listen({port: 3000})
    } catch (err)
    {
        console.error(err)
        process.exit(1)
    }
}
start()