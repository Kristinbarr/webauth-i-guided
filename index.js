const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session)
const db = require("./database/config")
const usersRouter = require("./users/users-router")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
	resave: false, // avoids recreating sessions that haven't saved
	saveUninitialized: false, // comply with GDPR laws
	secret: "keep it secret, keep it safe",
	store: new KnexSessionStore({
		knex: db, // configured instance of knex, or the live db connection
		createTable: true // if the session table does not exist, create it
	}),
	cookie: {
		maxAge: 1 * 24 * 60 * 60 * 1000,// 1 day in milliseconds
		secure: false, // only set cookies over https. Server will not send back a cookie over http.
		httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
	},
}))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
