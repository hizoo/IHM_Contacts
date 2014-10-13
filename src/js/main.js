var contacts = new Contacts();

[{
	person: new Person({
		firstName: 'Johnny',
		middleName: '',
		lastName: 'Bravo'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
},
{
	person: new Person({
		firstName: 'Julien',
		middleName: '',
		lastName: 'Crescence'
	})
}].forEach(function(attributesObject) {
	contacts.create(attributesObject);
});

var contactListView = new ContactListView({
	el: document.querySelector('#list-container ul'),
	collection: contacts
});