const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
require('./models/todo');
dotenv.config()

mongoose.connect(process.env.db, {
    useNewUrlParser: true
}, (err) => {
    if (err) throw err
})

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: { cors: true }
})

const init = async () => {
    try {
        routes.forEach((route)=>{
            server.route(route)
        })
        await server.start()
        console.log(`Starting server at: ${server.info.uri}`)
    } catch (err) {
        console.error(err)
    }
}

init()
