/************************** 
* Application 
**************************/
Km = Em.Application.create();

var selectedAccount = 5;

/************************** 
* Models 
**************************/
Km.Activity = Em.Object.extend({


});

Km.Account = Em.Object.extend({

});

/************************** 
* Views
**************************/
Km.ActivityListView = Em.View.extend({ 
	

});
Km.AccountListView = Em.View.extend({


});
/************************** 
* Controllers 
**************************/
Km.activitiesController = Em.ArrayProxy.create({

	alias: null,
	
	content:[],

	loadActivities: function () {
		var self = this;
		$.getJSON('data/activities.json', function(data) {
			data.forEach(function(item) {
				self.pushObject(Km.Activity.create(item));
			});
		});
	}

});
Km.accountsController = Em.ArrayProxy.create({

	content:[],

	loadAccounts: function () {
		var self = this;
		$.getJSON('data/accounts.json', function(data) {
			
			data.forEach(function(item) {
				self.pushObject(Km.Account.create(item));
			});
		});
	}

});

Km.activitiesController.loadActivities();

Km.accountsController.loadAccounts();

