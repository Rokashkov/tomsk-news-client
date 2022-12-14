import { ChangeEvent, useEffect, useState } from "react"
import ArticleElementEditable from "../../components/ArticleElementEditable"
import Button from "../../components/Button"
import CustomTextarea from "../../components/CustomTextarea"
import Layout from "../../components/Layout"
import SelectTag from "../../components/SelectTag"
import TextareaAutosize from 'react-textarea-autosize'
import KeywordElementEditable from "../../components/KeywordElementEditable"

function Create () {
	const [textValue, useTextValue] = useState('')
	const [keywordValue, useKeywordValue] = useState('')
	const [tagValue, useTagValue] = useState('p' as tag)
	const [visible, useVisible] = useState(false)
	const [keywordVisible, useKeywordVisible] = useState(false)
	const [content, useContent] = useState([] as content)
	const [keywords, useKeywords] = useState([] as string[])
	const [title, useTitle] = useState('')
	const [description, useDescription] = useState('')
	const [fetching, useFetching] = useState(false)

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

	const handleKeywordCreateClick = () => {
		if (keywords[0] && keywords.indexOf(keywordValue) !== -1) {
			return
		}
		keywords.push(keywordValue)
		useKeywords(keywords)
		useKeywordValue('')
		useKeywordVisible(false)
	}

	const handleKeywordCancelClick = () => {
		useKeywordValue('')
		useKeywordVisible(false)
	}

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		useTextValue(e.target.value)
	}
	
	const handleKeywordChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		useKeywordValue(e.target.value)
	}
	
	useEffect(() => {
		if (fetching) {
			const response = fetch(
				`${ process.env.NEXT_PUBLIC_API_DOMAIN }/article/create`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify({
						title,
						description,
						keywords,
						content
					})
				}
			)
			response.then(response => {
				response.json().then(data => {
					useFetching(false)
					console.log(data)
				},
				(err) => {
					useFetching(false)
					console.log(err)
				})
			})
		}
	}, [fetching])

	return (
		
		<Layout>
			<fieldset>
				<legend>Title</legend>
				<TextareaAutosize
				className="p"
				onChange={ (e) => {
					useTitle(e.target.value)
				} }
				/>
			</fieldset>
			<fieldset>
				<legend>Description</legend>
				<TextareaAutosize
				className="p"
				onChange={ (e) => {
					useDescription(e.target.value)
				} }
				/>
			</fieldset>
			<fieldset className="keywords">
				<legend>Keywords</legend>
				{ keywords.map((text) => {
					return <KeywordElementEditable 
						tag={ "p" as tag }
						key={ keywords.indexOf(text) }
						index={ keywords.indexOf(text) }
						keywords={ keywords }
						useKeywords={ useKeywords }
						textValue={ text }
					>
						{ text }
					</KeywordElementEditable>
				}) }
				{ !keywordVisible && <Button
					handleClick={ () => useKeywordVisible(true) }
					className="new"
				>New keyword</Button> }
				{ keywordVisible && (
					<>
						<CustomTextarea
							tagValue={ tagValue }
							handleChange={ handleKeywordChange }
							autoFocus
						/>
						<div className="toolbar">
							<div className="button-group">
								<Button 
									handleClick={ handleKeywordCreateClick }
									className="confirm"
								>Confirm</Button>
								<Button 
									handleClick={ handleKeywordCancelClick }
									className="cancel"
								>Cancel</Button>
							</div>
						</div>
					</>
				)}
			</fieldset>
			<article>
			<>
				{ content.map((element) => {
					return (
						<ArticleElementEditable
							key={ content.indexOf(element) }
							tag={ element.tag }
							useContent={ useContent }
							tagValue={ element.tag }
							textValue={ element.text}
							content={ content }
							index={ content.indexOf(element) }
						>{ element.text }</ArticleElementEditable>
					)
				})}
			</>
			{ !visible && <Button
				handleClick={ () => useVisible(true) }
				className="new"
			>New element</Button> }
			{ visible && (
				<>
					<CustomTextarea
						tagValue={ tagValue }
						handleChange={ handleChange }
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
			</article>
			<div 
				className="create-article"
				onClick={ () => {
					useFetching(true)
				} }
			>Create article</div>
		</Layout>
	)
}

export default Create