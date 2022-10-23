interface MainProps {
	children?: JSX.Element | JSX.Element[] | string
}

function Main (props: MainProps) {
	return (
		<main>{ props.children }</main>
	)
}

export default Main