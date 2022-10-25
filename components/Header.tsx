function Header () {
	const CLIENT_DOMAIN = process.env.NEXT_PUBLIC_CLIENT_DOMAIN
	return (
		<header>
			<nav>
				<a href={ CLIENT_DOMAIN } className="logo"/>
				<a href={ CLIENT_DOMAIN } className="logo_label">Tomsk News</a>
			</nav>
			<nav>
				<ul>
					<li><a href={ CLIENT_DOMAIN }>Main Page</a></li>
					<li><a href={ `${ CLIENT_DOMAIN }/article/all` }>All Articles</a></li>
					<li><a href={ `${ CLIENT_DOMAIN }/article/create` }>Create Article</a></li>
					<li><a href={ `${ CLIENT_DOMAIN }/article/edit/15` }>Edit Article</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header