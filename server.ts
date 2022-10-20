import express from 'express'
import next from 'next'
import http from 'http'
import https from 'https'
import path from 'path'
import fs from 'fs'
import redirect from './redirect'

async function start () {
	const app = next({})

	await app.prepare()
	
	const server = express()

	server.all('*', (req, res) => {
		const handle =  app.getRequestHandler()
		return handle(req, res)
	})

	const __certs = path.resolve(__dirname, '..', '..', 'etc', 'letsencrypt', 'live', 'tomsk-news.ru')
	
	const privateKey  = fs.readFileSync(path.resolve(__certs, 'privkey.pem'), 'utf8')
	const certificate = fs.readFileSync(path.resolve(__certs, 'fullchain.pem'), 'utf8')

	const credentials = {
		key: privateKey,
		cert: certificate
	}

	https.createServer(credentials, server).listen(443)
	http.createServer(redirect).listen(80)
}

start()