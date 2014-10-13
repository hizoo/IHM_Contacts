var ContactListItemView = Backbone.View.extend({
	// makes an instance and sets its root element as a child of this.el
	render: function() {
		this.templateInstance = ContactListItemView.template.getInstance();

		var bindingFunction = function(attrValue, element) { element.innerHTML = attrValue + ' '; };

		T.util.bind(
			this.model.get('person'),
			['firstName', 'middleName', 'lastName'],
			this.templateInstance,
			bindingFunction);

		this.el.appendChild(this.templateInstance.el);
	},

	initialize: function() {
		this.listenTo(this.model, 'destroy', this.remove);
	}

}, {
	template: Templates.contactListItemTemplate
});

var ContactListView = Backbone.View.extend({
	render: function() {
		this.itemViews.forEach(function(itemView) { itemView.render(); });
	},

	initialize: function() {
		var self = this;
		this.itemViews = this.collection.map(function(model) {
			var line = document.createElement('li');
			line.className = 'contact-list-item no-select';
			self.el.appendChild(line);
			return new ContactListItemView({ model: model, el:  line });
		});
		this.render();
	}
});

/*var ContactView = Backbone.View.extend({
	render: function() {
		//this.$el.html(this.template(this.model));
	},

	initialize: function() {
		this.setModel = function(model) {
			this.model = model;
			if (model) {
				this.listenTo(model, 'change', this.render);
				this.render();
			}
		}

		this.setModel(this.model);
	}
});*/