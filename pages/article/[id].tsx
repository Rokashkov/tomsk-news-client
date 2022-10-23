import ArticleContentElement from "../../components/ArticleContentElement"
import Layout from "../../components/Layout"

interface IProps {
	article: {
		id: number
		title: string
		description: string
		keywords: string[]
		content: content
		creactedAt: string
		updatedAt: string
	}
}

export default function (props: IProps) {
	const article = props.article
	const { id } = article
	const content = article.content
	return (
		<Layout>
			<div>id: { article.id }</div>
			<div>title: { article.title }</div>
			<div>{ content.map((element) => {
				return (
					<ArticleContentElement
						key={ content.indexOf(element) }
						tag={ element.tag }
					>{ element.text }</ArticleContentElement>
				)
			})}</div>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const response = await fetch(`http://${ process.env.HOST }:5000/api/article/?id=${ context.query.id }`)
	if (response.status === 400) {
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