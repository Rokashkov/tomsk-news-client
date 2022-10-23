interface ArticleElementProps {
	tag: tag
	children: string
}

function ArticleElement (props: ArticleElementProps) {

	return (
		<props.tag>{ props.children }</props.tag>
	)
}

export default ArticleElement