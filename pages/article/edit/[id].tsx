import { ChangeEvent, useEffect, useState } from "react"
import ArticleContentElementEditable from "../../../components/ArticleElementEditable"
import Button from "../../../components/Button"
import CustomTextarea from "../../../components/CustomTextarea"
import Layout from "../../../components/Layout"
import SelectTag from "../../../components/SelectTag"
import TextareaAutosize from 'react-textarea-autosize'
import KeywordElementEditable from "../../../components/KeywordElementEditable"
import IArticle from "../../../interfaces/IArticle"

interface EditProps {
	article: IArticle
}

function Edit (props: EditProps) {
	const { article } = props
	const { id } = article
	const [textValue, useTextValue] = useState('')
	const [keywordValue, useKeywordValue] = useState('')
	const [tagValue, useTagValue] = useState('p' as tag)
	const [visible, useVisible] = useState(false)
	const [keywordVisible, useKeywordVisible] = useState(false)
	const [content, useContent] = useState(article.content)
	const [keywords, useKeywords] = useState(article.keywords)
	const [title, useTitle] = useState(article.title)
	const [description, useDescription] = useState(article.description)
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
				`${ process.env.NEXT_PUBLIC_API_DOMAIN }/article/edit`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify({
						id,
						title,
						description,
						keywords,
						content
					})
				}
			)
			response.then(response => {
				response.json().then(data => {
					console.log(data)
					useFetching(false)
				})
			})
		}
	}, [fetching])

	return (
		
		<Layout>
			<fieldset>
				<legend>Title</legend>
				<TextareaAutosize
					defaultValue={ article.title }
					className="p"
					onChange={ (e) => {
						useTitle(e.target.value)
					} }
				/>
			</fieldset>
			<fieldset>
				<legend>Description</legend>
				<TextareaAutosize
					defaultValue={ article.description }
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
					fetching ? console.log('i can\'t') : console.log('i can')
				} }
			>Update article</div>
		</Layout>
	)
}

export default Edit

export async function getServerSideProps(context) {
	const response = await fetch(`${ process.env.API_DOMAIN }/article/?id=${ context.query.id }`)
	if (response.status >= 400) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			  },
		}
	}
	const article = await response.json()
	return {
		props: { article },
	}
}