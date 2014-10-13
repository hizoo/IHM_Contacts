var Person = Backbone.Model.extend({
	defaults: {
		firstName: undefined,
		middleName: undefined,
		lastName: undefined,
		pictureURL: undefined
	}
});

var Address = Backbone.Model.extend({
	defaults: {
		country: undefined,
		state: undefined,
		county: undefined,
		zip: undefined,
		city: undefined,
		street: undefined,
		number: undefined,
		numberExt: undefined,
		additionalInfo: undefined
	}
});

var PhoneNumber = Backbone.Model.extend({
	defaults: {
		countryCode: undefined,
		suffix: undefined
	},

	toString: function() {
		var cc = this.get('countryCode');
		if (typeof cc === 'string' && cc.length > 0) {
			return '+' + cc + ' ' + this.get('suffix');
		} else if (typeof cc === 'number') {
			return '+' + String(cc) + ' ' + this.get('suffix');
		} else {
			return this.get('suffix');
		}
	}
}, {
	parse: function(str) {
		var parts = /^(?:\+(\d{1,3})\s+)?([\d\s]+)$/.exec(str);
		if (parts !== null) {
			return new PhoneNumber({ countryCode: parts[1], suffix: parts[2] });
		} else {
			console.log('Unable to parse input string ' + str + ' into a PhoneNumber instance');
			return null;
		}
	}
});

var EMailAddress = Backbone.Model.extend({
	defaults: {
		local: undefined,
		domain: undefined
	},

	toString: function() { return this.get('local') + '@' + this.get('domain'); }
}, {
	parse: function(str) {
		var parts = /^([-_\w]+(?:\.[-_\w]+)*)@([\w]+(?:\.\w+)+)$/.exec(str);
		if (parts !== null) {
			return new EMailAddress({ local: parts[1], domain: parts[2] });
		} else {
			console.log('Unable to parse input string ' + str + ' into an EMailAddress instance');
			return null;
		}
	}
});

var Contact = Backbone.Model.extend({
	defaults: {
		person: null,
		phoneNumbers: [],
		emailAddresses: [],
		addresses: [],
		notes: []
	}
});

var Contacts = Backbone.Collection.extend({
	model: Contact,
	url: '/contacts'
});