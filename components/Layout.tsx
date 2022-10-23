import Head from "next/head"
import Header from "./Header"
import Main from "./Main"

interface LayoutProps {
	children?: JSX.Element | JSX.Element[] | string
	title?: string
}

function Layout (props: LayoutProps) {
	return (
		<>
			<Head>
				<title>{props.title || 'Tomsk News' }</title>
			</Head>
			<Header/>
			<Main>{ props.children }</Main>
		</>
	)
}

export default Layout