// TODO allow multiple base elements, or else the user has to provide a root??

var T = (function() {

	// TODO add more tags
	var tags = ['div', 'span', 'ul', 'ol', 'li', 'img', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'input', 'button', 'form', 'script', 'table', 'tr', 'th', 'td'];

	// meld object a into object b // TODO use iteration instead of recursion?
	function meld(a, b)
	{
		for (var key in a) {
			if (!(key in b) || typeof a[key] !== 'object' || typeof b[key] !== 'object') {
				b[key] = a[key];
			} else {
				meld(a[key], b[key]);
			}
		}
	}

	// TODO maybe use iteration instead of recursion
	function treeReduce(tree, childrenArrayGetter, func)
	{
		return func(tree, childrenArrayGetter(tree).map(function(child) {
			return treeReduce(child, childrenArrayGetter, func);
		}));
	}

	function template(elementName)
	{
		return function() {

			var children = [], handle, options = {};

			// Overload 1: function used with signature "Template el(Array<Template> el, Object options = {}, String handle = undefined)"
			// or "Template el(Array<Template> el, String handle, Object options = {})"

			// Overload 2: function used with signature "Template el(String innerHTML, Object options = {}, String handle = undefined)"
			// or "Template el(String innerHTML, String handle, Object options = {})"

			// Overload 3: function used with signature "Template el(Template t1, Template t2, ...)", which is a shorthand

			var ov1 = arguments[0] instanceof Array,
				ov2 = typeof arguments[0] === 'string';

			if (ov1) { children = arguments[0]; }

			if (ov1 || ov2) {

				// get options object and handle
				if (typeof arguments[1] === 'object') {
					options = arguments[1];
					handle = arguments[2];
				} else {
					options = typeof arguments[2] === 'object' ? arguments[2] : {};
					handle = arguments[1];
				}
				handle = (handle && typeof handle === 'string') ? handle : undefined;

				if (ov2) { options.innerHTML = arguments[0]; }

			} else {
				// Overload 3: handle is undefined, options is {}
				children = Array.prototype.slice.call(arguments); // this actually means "convert arguments to an Array, store into children"
			}


			//
			// The map associating handles to template nodes
			//

			var templateNodeMap = {};

			// Regroup the templateNodeMaps of the children into this node's map
			children.forEach(function(child) {
				for (var h in child.templateNodeMap) {
					templateNodeMap[h] = child.templateNodeMap[h];
				}
				delete child.templateNodeMap; // delete the incomplete and useless map
				delete child.getNode; // delete the useless accessor function
				delete child.getInstance; // delete the useless template instantiation function
			});

			// the returned template node
			var result = {
				handle: handle,

				elementName: elementName,
				options: options,
				children: children,

				templateNodeMap: templateNodeMap,
				getNode: function(h) {
					return templateNodeMap[h];
				},
				setHandle: function(h) {
					if (h !== this.handle) {
						if (this.handle in this.templateNodeMap) {
							delete this.templateNodeMap[this.handle];
						}
						this.handle = h;
						this.templateNodeMap[h] = this;
					}
				},
				getInstance: function() {
					var instance = treeReduce(
						this,
						function(tree) { return tree.children; },
						function(tree, newChildren) {
							var el = document.createElement(tree.elementName);

							// configure the element
							var attrs = tree.options.attributes;
							if (attrs) {
								for (var attr in attrs) {
									el.setAttribute(attr, attrs[attr]);
								}
								delete tree.options.attributes;
							}
							meld(tree.options, el);

							var elementMap = {};

							newChildren.forEach(function(child) {
								el.appendChild(child.el);
								for (var h in child.elementMap) {
									elementMap[h] = child.elementMap[h];
								}
								delete child.elementMap;
							});

							var result = {
								el: el,
								elementMap: elementMap
							};

							if (tree.handle)
								elementMap[tree.handle] = el;

							return result;
						}
					);

					var elementMap = instance.elementMap;
					instance.getElement = function(h) {
						return elementMap[h];
					};

					delete instance.elementMap;

					return instance;
				}
			};

			children.forEach(function(child) {
				child.parent = result;
			});

			if (handle)
				templateNodeMap[handle] = result;

			return result;
		};
	}

	var T = {};

	tags.forEach(function(tag) {
		T[tag] = template(tag);
	});

	T.util = {
		/**
		 * Insert template 't1' into template 't2' as a child node of template node 'node' t2
		 * The DOM subtree of t1 is inserted among the children of the template node indicated by node.
		 * node may be an actual template node object or the handle of one such object pertaining to t2.
		 * NOTE: Any handle conflict between the handles of t1 and t2 will result in the handle of t1 overwriting that of t2.
		 */
		appendChild: function(t1, t2, node) {
			if (typeof node === 'string')
				node = t2.getNode(node);

			node.children.push(t1.node);
			for (var h in t1.templateNodeMap) {
				t2.templateNodeMap[h] = t1.templateNodeMap[h];
			}
		},

		/**
		 * Binds each of the model's attributes to the template instance element whose handle is equal to the attribute's name,
		 * if it exists, using model.on('change:attrName', ...). Additionally, the model's "destroy" event causes the template
		 * instance to be removed from the DOM if applicable, using model.on('destroy', ...).
		 * The exact nature of the dependency is specified by the func callback argument which is called with the model's
		 * attribute value and the DOM element as parameters.
		 */
		correspond: function(model, ti, func) {
			model.on('destroy', function() {
				ti.el.remove();
			});
			// all of the model's attribute names have to be handles in the template instance, or else,
			// func will be called with undefined as its second parameter
			for (var attr in model.attributes) {
				model.on('change:' + attr, function() {
					func(model.get(attr), ti.getElement(attr));
				});
			}
		},

		bind: function(model, attrs, ti, func) {
			var aux = function(attr) {
				// perform the binding
				model.on('change:' + attr, function() {
					func(model.get(attr), ti.getElement(attr));
				});
				// initialize the target of the binding
				func(model.get(attr), ti.getElement(attr));
			};

			// if only 1 attribute was specified, directly as a String
			if (typeof attrs === 'string') {
				aux(attrs);
			} else {
				attrs.forEach(aux);
			}
		}
	};

	return T;
})();