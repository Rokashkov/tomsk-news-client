import ArticleElement from "../../components/ArticleElement"
import Layout from "../../components/Layout"
import IArticle from "../../interfaces/IArticle"

interface IProps {
	article: IArticle
}

export default function (props: IProps) {
	const { article } = props 
	const { id } = article
	const content = article.content
	return (
		<Layout
			title={ article.title }
			description={ article.description }
			keywords={ article.keywords }
		>	
			<article>
				{ content.map((element) => {
					return (
						<ArticleElement
							key={ content.indexOf(element) }
							tag={ element.tag }
						>{ element.text }</ArticleElement>
					)
				})}
			</article>
		</Layout>
	)
}

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