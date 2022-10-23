import { MouseEventHandler, SetStateAction, useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'

interface TextareaProps {
	tagValue: tag
	useTextValue: (value: SetStateAction<string>) => void
	autoFocus?: true
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
			onChange={ (e) => {
				props.useTextValue(e.target.value)
			}}
		/>	
	)
}

export default Textarea