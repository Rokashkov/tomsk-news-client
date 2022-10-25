import { SetStateAction, useState, MouseEvent, ChangeEvent } from "react"
import Button from "./Button"
import CustomTextarea from "./CustomTextarea"
import SelectTag from './SelectTag'

interface KeywordElementEditableProps {
	tag: tag
	children: string
	textValue: string
	useKeywords: (value: SetStateAction<string[]>) => void
	keywords: string[]
	index: number
}

function KeywordElementEditable (props: KeywordElementEditableProps) {
	const { index, useKeywords, keywords } = props
	const [visible, useVisible] = useState(false)
	const [textValue, useTextValue] = useState(props.children)
	const [previousTextValue, usePreviousTextValue] = useState(props.children)
	const [exist, useExist] = useState(true)

	const handleConfirmClick = () => {
		keywords[index] = textValue
		useKeywords(keywords)
		useVisible(false)
		usePreviousTextValue(textValue)
	}

	const handleCancelClick = () => {
		useVisible(false)
		useTextValue(previousTextValue)
	}

	const handleDeleteClick = () => {
		useExist(false)
		keywords.splice(index, 1)
		useKeywords(keywords)
	}

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		useTextValue(e.target.value)
	}

	return (
		<>
			{ exist && (
				<div className="element">
					<CustomTextarea
						value={ textValue }
						tagValue={ props.tag }
						handleChange={ handleChange }
						onClick={ () => useVisible(true) }
					/>
					<div 
						className="cross"
						onClick={ handleDeleteClick }
					>
						<div className="top"></div>
						<div className="bot"></div>
					</div>
				</div>
			)}
			{ exist && visible && (
				<>
					<div className="toolbar">
						<div className="button-group">
							<Button 
								handleClick={ handleConfirmClick }
								className="confirm"
							>Confirm</Button>
							<Button 
								handleClick={ handleCancelClick }
								className="cancel"
							>Cancel</Button>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default KeywordElementEditable