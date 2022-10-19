import express from 'express'
import next from 'next'
import http from 'http'
import https from 'https'
import path from 'path'
import fs from 'fs'

const app = next({
	dev: false,
	dir: __dirname,
	port: 443
})

async function start () {
	await app.prepare()

	const server = express()
	const redirect = express()

	const __certs = path.resolve(__dirname, '..', '..', '..', 'etc', 'letsencrypt', 'live', 'rokashkov.ru')

	const privateKey  = fs.readFileSync(path.resolve(__certs, 'privkey.pem'), 'utf8')
	const certificate = fs.readFileSync(path.resolve(__certs, 'fullchain.pem'), 'utf8')

	const credentials = {
		key: privateKey,
		cert: certificate
	}

	server.all('*', (req, res) => {
		const handle =  app.getRequestHandler()
		return handle(req, res)
	})

	redirect.get('*', (req, res) => {
		res.redirect(`https://${ req.headers.host + req.originalUrl}`)
	})

	http.createServer(redirect).listen(80)
	https.createServer(credentials, server).listen(443)
}

start()