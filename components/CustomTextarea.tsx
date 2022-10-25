import { ChangeEvent } from "react"
import TextareaAutosize from 'react-textarea-autosize'

interface TextareaProps {
	tagValue?: tag
	handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
	autoFocus?: boolean
	onClick?: () => void
	value?: string
}

function Textarea (props: TextareaProps) {
	return (
		<TextareaAutosize
			value={ props.value }
			onClick={ props.onClick }
			autoFocus={ props.autoFocus }
			className={ props.tagValue }
			onChange={ props.handleChange }
		/>	
	)
}

export default Textarea