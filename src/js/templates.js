var Templates = {
	contactListItemTemplate: T.div(
		T.div([
			T.img([], 'picture', { className: 'contact-list-item-picture-img' })
		], { className: 'contact-list-item-picture' }),
		T.div([
			T.span([], 'firstName'),
			T.span([], 'middleName'),
			T.span([], 'lastName')
		], { className: 'contact-list-item-fields' }),
		T.div([], { className: 'clearfix' })
	)
};