declare namespace NodeJS {
	interface ProcessEnv {
		HOST: string
	}
}



type tag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type content = Array<{
	tag: tag,
	text: string
}>