import { SetStateAction, useState, MouseEvent, ChangeEvent } from "react"
import Button from "./Button"
import CustomTextarea from "./CustomTextarea"
import SelectTag from './SelectTag'

interface ArticleElementEditableProps {
	tag: tag
	children: string
	tagValue: tag
	textValue: string
	useContent: (value: SetStateAction<content>) => void
	content: content
	index: number
}

function ArticleElementEditable (props: ArticleElementEditableProps) {
	const { index, useContent, content } = props
	const [visible, useVisible] = useState(false)
	const [textValue, useTextValue] = useState(props.children)
	const [tagValue, useTagValue] = useState(props.tag)
	const [previousTextValue, usePreviousTextValue] = useState(props.children)
	const [exist, useExist] = useState(true)

	const handleConfirmClick = () => {
		content[index] = {
			tag: tagValue,
			text: textValue
		}
		useContent(content)
		useVisible(false)
		usePreviousTextValue(textValue)
	}

	const handleCancelClick = () => {
		useVisible(false)
		useTextValue(previousTextValue)
	}

	const handleDeleteClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		useExist(false)
		content.splice(index, 1)
		useContent(content)
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
						tagValue={ tagValue }
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
						<SelectTag defaultValue={ tagValue } useTagValue={ useTagValue }></SelectTag>
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

export default ArticleElementEditable