import ArticleElement from "../../components/ArticleElement"
import Layout from "../../components/Layout"
import IArticle from "../../interfaces/IArticle"

interface AllProps {
	articles: IArticle[]
}

function All (props: AllProps) {
	return (
		<Layout>
			{ props.articles.map((article: IArticle) => {
				return (
					<article key={ article.id }>
						{ article.content.map((element) => {
							return <ArticleElement key={ article.content.indexOf(element) } tag={ element.tag }>{ element.text }</ArticleElement>
						}) }
					</article>
				)
			}) }
		</Layout>
	)
}

export default All

export async function getServerSideProps(context) {
	const response = await fetch(`${process.env.API_DOMAIN}/article/all`)
	if (response.status >= 400) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			  },
		}
	}
	const articles = await response.json()
	return {
		props: { articles },
	}
}