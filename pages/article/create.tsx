import { useState } from "react"
import ArticleContentElementEditable from "../../components/ArticleContentElementEditable"
import Button from "../../components/Button"
import CustomTextarea from "../../components/CustomTextarea"
import Layout from "../../components/Layout"
import SelectTag from "../../components/SelectTag"

function Create () {
	const [textValue, useTextValue] = useState('')
	const [tagValue, useTagValue] = useState('p' as tag)
	const [visible, useVisible] = useState(false)
	const [content, useContent] = useState([] as content)

	const handleCreateClick = () => {
		content.push({
			tag: tagValue,
			text: textValue
		})
		useContent(content)
		useTextValue('')
		useTagValue('p')
		useVisible(false)
	}

	const handleCancelClick = () => {
		useTextValue('')
		useTagValue('p')
		useVisible(false)
	}
	
	return (
		
		<Layout>
			{ content[0] && <article>
				{ content.map((element) => {
					console.log(content.length)
					return (
						<ArticleContentElementEditable
							key={ content.indexOf(element) }
							tag={ element.tag }
							useContent={ useContent }
							tagValue={ element.tag }
							textValue={ element.text}
							content={ content }
							index={ content.indexOf(element) }
						>{ element.text }</ArticleContentElementEditable>
					)
				})}
			</article> }
			{ !visible && <Button
				handleClick={ () => useVisible(true) }
				className="new"
			>New element</Button> }
			{ visible && (
				<>
					<CustomTextarea
						tagValue={ tagValue }
						useTextValue={ useTextValue }
						autoFocus
					/>
					<div className="toolbar">
						<SelectTag defaultValue={ tagValue } useTagValue={ useTagValue }></SelectTag>
						<div className="button-group">
							<Button 
								handleClick={ handleCreateClick }
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
		</Layout>
	)
}

export default Create