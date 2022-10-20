export default function ({ article }) {
	console.log(article)
	const { id } = article
	return (
		<>
			<div>id: { article.id }</div>
			<div>title: { article.title }</div>
			<div>content: { article.content[0] }</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const response = await fetch(`http://tomsk-news.ru:5000/api/article/?id=${ context.query.id }`)
	const article = await response.json()
	return {
		props: { article },
	}
}