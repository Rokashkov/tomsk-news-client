declare namespace NodeJS {
	interface ProcessEnv {
		HOST: string
		PROTOCOL: string
		API_PORT: number
		CLIENT_PORT: number
		API_DOMAIN: string
		CLIENT_DOMAIN: string
		NEXT_PUBLIC_API_DOMAIN: string
		NEXT_PUBLIC_CLIENT_DOMAIN: string
	}
}



type tag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type content = {
	tag: tag,
	text: string
}[]