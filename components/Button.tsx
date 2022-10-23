interface ButtonProps {
	handleClick: () => void
	children: string
	className?: string
}

function Button (props: ButtonProps) {
	return (
		<div
			className={ 'button' + ' ' + props.className }
			onClick={ props.handleClick }
		>{ props.children }</div>
	)
}

export default Button