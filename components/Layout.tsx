import Head from "next/head"
import Header from "./Header"
import Main from "./Main"

interface LayoutProps {
	children?: JSX.Element | JSX.Element[] | string
	title?: string
	description?: string
	keywords?: string[]
}

function Layout (props: LayoutProps) {
	return (
		<>
			<Head>
				<title>{props.title || 'Tomsk News' }</title>
				<meta name="description" content={ props.description || 'tomsk-news' }/>
				<meta name="Keywords" content={ props.keywords ? props.keywords.join(', ') : 'tomsk-news' }/> 
			</Head>
			<Header/>
			<Main>{ props.children }</Main>
		</>
	)
}

export default Layout