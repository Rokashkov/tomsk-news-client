import express from 'express'

const redirect = express()

redirect.get('*', (req, res) => {
	res.redirect(`https://${ req.headers.host + req.originalUrl}`)
})

export default redirect