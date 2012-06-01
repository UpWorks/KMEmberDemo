/************************** 
* Application 
**************************/
Km = Em.Application.create({
	rootElement: $('#kmselector')
});
/************************** 
* Models 
**************************/
Km.Activity = Em.Object.extend({

});
Km.Account = Em.Object.extend({

});

Km.SelectedAccount = Em.Object.extend({
	id: null
});

var selectedAccount = Km.SelectedAccount.create({id:9});


/************************** 
/* Controllers 
/**************************/
Km.activitysController = Em.ArrayProxy.create({
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


Km.activitysController.loadActivities();

Km.selectedActivityController = Em.Object.create({
	key: null
});

Km.accountsController = Em.ArrayProxy.create({
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

Km.selectedAccountController = Em.Object.create({
	key: null
});

Km.accountsController.loadAccounts();

/************************** 
* Views
**************************/
Km.ActivityListView = Em.View.extend({
	classNameBindings: ['isSelected'],
	clicked: function (e) {
		
		e.preventDefault();

		var parentID = e.view.content.id,
			childID = e.context.id
			parentActivity = Km.activitysController.objectAt(parentID - 1),
			parentActivityName = parentActivity.name;

		Km.selectedActivityController.set('key', parentID + '_' + childID);

		console.log(parentActivityName + ' >> ' + parentActivity.activitytypes[childID - 1].name);

		console.log(Km.selectedActivityController.key);

	}
});

Km.ActivityView = Em.View.extend({

});

Km.AccountListView = Em.View.extend({
	classNameBindings: ['isSelected'],
	clicked: function (e) {
		
		e.preventDefault();

		var parentID = e.view.content.id,
			childID = e.context.id
			parentAccount = Km.accountsController.objectAt(parentID - 1),
			parentAccountName = parentAccount.name;

			console.log(parentID);

			console.log(childID);

		Km.selectedAccountController.set('key', parentID + '_' + childID);

		console.log(parentAccountName + ' >> ' + parentAccount.accounttypes[childID - 1].name);

		console.log(Km.selectedAccountController.key);

	}
});

/************************** 
* Handlebar Helpers
**************************/
//Template Display Logic for Showing Alias Based on Selected AccountType
Handlebars.registerHelper('aliasOn', function (property) {
	var objTypes = Em.getPath(this, property),
		strActivityName = objTypes.name,
		strAliasName = objTypes.aliasname,
		intSelectedAccount = selectedAccount.get('id'),
		objShowOnIDs = objTypes.showaliasaccountid;
	if (typeof strAliasName === 'string' 
			&& $.inArray(intSelectedAccount, objShowOnIDs) > 0) {
			return new Handlebars.SafeString(strAliasName);
		} else {
			return new Handlebars.SafeString(strActivityName);
		} 
});
