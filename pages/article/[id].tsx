export default function ({ article }) {
	const { id } = article
	return (
		<>
			<div>id:{ article.id }</div>
			<div>{ article.title }</div>
			<div>{ article.content[0] }</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const response = await fetch(`http://tomsk-news.ru:5000/api/article/${ context.query.id }`)
	const article = await response.json()
	return {
		props: { article },
	}
}