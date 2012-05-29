/************************** 
* Application 
**************************/
Km = Em.Application.create({
	rootElement: $('#selctor-app'),
	ready: function() {
		Km.activityController.loadActivities();
		Km.accountController.loadAccounts();
		this._super();

	}
});
/************************** 
* Models 
**************************/
Km.Activity = Em.Object.extend({
});

Km.Account = Em.Object.extend({

});

Km.selectedAccount = Em.Object.extend({
	id: 2
});
/************************** 
* Views
**************************/
Km.ActivityView = Em.View.extend({

	showAlias: function () {
		var arr = this.getPath('content.activitytypes'),
			show = false;
			console.log(arr);
			arr.forEach(function(item) {
				var aliasArr = item.showaliasaccountid;
				if (typeof aliasArr !== 'undefined') {
					if (jQuery.inArray(2,aliasArr)) {
						console.log('true');
						show = true;
					}
				}
			});
	}.property('content.@each')
});

Km.AccountView = Em.View.extend({

});

/************************** 
/* Controllers 
/**************************/
Km.activityController = Em.ArrayProxy.create({
	content: [],
	loadActivities: function () {
		var self = this;
		$.getJSON('data/activitys.json', function(data) {
			data.forEach(function(item) {
				self.pushObject(Km.Activity.create(item));
			});
		});
	}
});

Km.accountController = Em.ArrayController.create({
	content: [],
	loadAccounts: function () {
		var self = this;
		$.getJSON('data/accounts.json', function(data) {
			data.forEach(function(item) {
				self.pushObject(Km.Account.create(item));
			});
		});
	}
});
