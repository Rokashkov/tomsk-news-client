import express from 'express'
import next from 'next'
import { createServer as createHTTPServer } from 'http'
import { createServer as createHTTPSServer } from 'https'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import redirect from './redirect'

async function start () {
	const app = next({})

	await app.prepare()
	
	const server = express()

	server.use(express.static('public'))

	server.all('*', (req, res) => {
		const handle =  app.getRequestHandler()
		return handle(req, res)
	})

	const __certs = resolve(__dirname, '..', '..', 'etc', 'letsencrypt', 'live', 'tomsk-news.ru')

	const privateKey  = readFileSync(resolve(__certs, 'privkey.pem'), 'utf8')
	const certificate = readFileSync(resolve(__certs, 'fullchain.pem'), 'utf8')

	const credentials = {
		key: privateKey,
		cert: certificate
	}

	createHTTPSServer(credentials, server).listen(443)
	createHTTPServer(redirect).listen(80)
}

start()