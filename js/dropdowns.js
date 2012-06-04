/************************** 
* Application 
**************************/
Km = Em.Application.create({
	rootElement: $('#kmapp')
});

/************************** 
* Models 
**************************/
Km.Activity = Em.Object.extend({

});

Km.Account = Em.Object.extend({

});

Km.curentOverview = Em.Object.extend({
	content. null,

	retrieveCurrentOverview: function() {
		
	}
});

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

Km.overviewController = Em.ArrayProxy.create({

});

Km.activitysController.loadActivities();

Km.accountsController.loadAccounts();

Km.selectedActivityController = Em.Object.create({
	parentID: null,
	childID: null,
	isError: function(property) {
		return !Em.empty(this.get(property));
		},


});

Km.selectedAccountController = Em.Object.create({
	parentID: null,
	childID: null
});


/************************** 
* Views
**************************/
Km.DropDowns = Em.View.extend({
	
	templateName: 'kmdropdown',

	activitySelect: Em.View.extend({
		
		isOpen: false,
		
		selectedActivity: Em.Object.create({name: 'Select Activity', value:''}),
		
		contentBinding: 'Km.activitysController',

		dropdownToggle: function (e) {
			this.toggleProperty('isOpen');
			e.stopPropagation();
		},

		didInsertElement: function () {
			var self = this;
			$('body').on('click', function() {
				self.set('isOpen', false);
			});
		},

		select: function (e) {

			var parentID = e.context.parent_id,
					childID = e.context.id
					parentActivity = Km.activitysController.objectAt(parentID-1),
					parentActivityName = parentActivity.name,
					selected = e.context;

			e.preventDefault();

			console.log(parentID);

			console.log(childID);

			Km.selectedActivityController.set('parentID', parentID);

			Km.selectedActivityController.set('childID', parentID);

			console.log(parentActivityName + ' >> ' + parentActivity.activitynames[childID-1].name);

			console.log('ParentID ' + Km.selectedActivityController.parentID + ' ChildID ' + Km.selectedActivityController.childID),

			this.content.setEach('isActive', false);

			this.set('selectedActivity', selected);

			this.set('isOpen', false);
			
		}

	}),

	accountSelect: Em.View.extend({
		
		isOpen: false,
		
		selectedAccount: Em.Object.create({name: 'Select Account', value:''}),
		
		contentBinding: 'Km.accountsController',

		dropdownToggle: function (e) {
			this.toggleProperty('isOpen');
			e.stopPropagation();
		},

		didInsertElement: function () {
			var self = this;
			$('body').on('click', function() {
				self.set('isOpen', false);
			});
		},

		select: function (e) {

			var parentID = e.context.parent_id,
					childID = e.context.id
					parentAccount = Km.accountsController.objectAt(parentID-1),
					parentAccountName = parentAccount.name,
					selected = e.context;

			e.preventDefault();

			console.log(parentID);

			console.log(childID);

			Km.selectedAccountController.set('parentID', parentID);

			Km.selectedAccountController.set('childID', parentID);

			console.log(parentAccountName + ' >> ' + parentAccount.accounttypes[childID-1].name);

			console.log('ParentID ' + Km.selectedAccountController.parentID + ' ChildID ' + Km.selectedAccountController.childID),

			this.content.setEach('isActive', false);

			this.set('selectedAccount', selected);

			this.set('isOpen', false);
			
		}

	}),

	goButton: Em.View.extend({
		go: function(e) {
			console.log(Km.selectedActivityController.isError('parentID'));
			this.loadOverview();
			
		},
		loadOverview: function () {
			var str ="This is an overview";
			return str;

		}
	})
	
});

Km.OverView = Em.View.extend({

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
