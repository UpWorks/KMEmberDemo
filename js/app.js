/************************** 
* Application 
**************************/
var KM = Em.Application.create();

/************************** 
* Models 
**************************/
KM.Activity = Em.Object.extend({
	id: '',
	name: '',
	activities: [ 
		{
			id: '',
			name: '',
			alias: [
				{
					name: '',
					showAliasOn: []
				}
			]
		}
	],
	hasAlias: function () {
		var alias = this.get('activities.alias.name');
		console.log(alias);
		return alias !=='';
	}.property('activities.alias.name')
});
KM.Account = Em.Object.extend({
	id: '',
	name: '',
	accounts: [ 
		{
			id: '',
			name: ''
		}
	]
});

/************************** 
* Views
**************************/
KM.ActivityListView = Em.View.extend({
	templateName: 'activity',
	// activityNameBinding: 'activitiesController.content.name'
});
KM.AccountListView = Em.View.extend({
	templateName: 'account',
	// activityNameBinding: 'activitiesController.content.name'
});
/************************** 
* Controllers 
**************************/
KM.activitiesController = Em.ArrayController.create({

	content:[],

	loadActivities: function () {
		var self = this;
		$.getJSON('data/activities.json',function(data) {
			data.forEach(function(item) {
				self.pushObject(KM.Activity.create(item));
			});
		});
	}

});
KM.accountsController = Em.ArrayController.create({

	content:[],

	loadAccounts: function () {
		var self = this;
		$.getJSON('data/accounts.json',function(data) {
			data.forEach(function(item) {
				self.pushObject(KM.Account.create(item));
			});
		});
	}

});

KM.activitiesController.loadActivities();

KM.accountsController.loadAccounts();



