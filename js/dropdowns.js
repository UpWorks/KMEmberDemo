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

Km.activitysController.loadActivities();

Km.accountsController.loadAccounts();

Km.selectedActivityController = Em.Object.create({
	parentID: null,

	childID: null,

	isValid: function () {
		return !Em.empty(this.get('childID')) && !Em.empty(this.get('parentID'));
	},

	getKey: function () {
		if(this.isValid) {
			var actKey = String(this.get('parentID')) + String(this.get('childID'));
			return actKey;
		}
	}
});

Km.selectedAccountController = Em.Object.create({
	parentID: null,

	childID: null,

	isValid: function () {
		return !Em.empty(this.get('childID')) && !Em.empty(this.get('parentID'));
	},

	getKey: function () {
		if(this.isValid) {
			var actKey = String(this.get('parentID')) + String(this.get('childID'));
			return actKey;
		}
	}
});

Km.overviewController = Em.Object.create({
	tag: null,

	reset: function() {
		this.set('tag', null);
	}
});


/************************** 
* Views
**************************/
Km.DropDowns = Em.View.extend({
	
	templateName: 'kmdropdown',

	debug: false,

	activitySelect: Em.View.extend({
		
		isOpen: false,
		
		selectedActivity: Em.Object.create({name: 'Select Activity', value:''}),
		
		contentBinding: 'Km.activitysController',

		dropdownToggle: function (e) {
			this.toggleProperty('isOpen');
			e.stopPropagation();
			e.preventDefault();
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
				selected = e.context,
				overview = Km.overviewController;



			overview.reset();

			Km.selectedActivityController.set('parentID', parentID);

			Km.selectedActivityController.set('childID', childID);

			this.content.setEach('isActive', false);
			this.set('selectedActivity', selected);

			this.set('isOpen', false);

			e.preventDefault();

			if (this._parentView.debug) {
				var parentActivity = Km.activitysController.objectAt(parentID-1),
					parentActivityName = parentActivity.name;
				console.log(parentID);
				console.log(childID);
				console.log(parentActivityName + ' >> ' + parentActivity.activitynames[childID-1].name);
				console.log('ParentID ' + Km.selectedActivityController.parentID + 
							' ChildID ' + Km.selectedActivityController.childID);
			}
			
		}

	}),

	accountSelect: Em.View.extend({
		
		isOpen: false,
		
		selectedAccount: Em.Object.create({name: 'Select Account', value:''}),
		
		contentBinding: 'Km.accountsController',

		dropdownToggle: function (e) {
			this.toggleProperty('isOpen');
			e.stopPropagation();
			e.preventDefault();
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
				selected = e.context,
				overview = Km.overviewController;

			e.preventDefault();

			overview.reset();

			Km.selectedAccountController.set('parentID', parentID);

			Km.selectedAccountController.set('childID', childID);

			this.content.setEach('isActive', false);

			this.set('selectedAccount', selected);

			this.set('isOpen', false);

			if (this._parentView.debug) {

				var parentAccount = Km.accountsController.objectAt(parentID-1),
					parentAccountName = parentAccount.name;

				console.log(parentID);
				console.log(childID);
				console.log(parentAccountName + ' >> ' + parentAccount.accounttypes[childID-1].name);
				console.log('ParentID ' + Km.selectedAccountController.parentID + 
							' ChildID ' + Km.selectedAccountController.childID);

			}
			
		}

	}),

	goButton: Em.View.extend({
		
		isDisabled: true,

		go: function(e) {
			var activityIsValid = Km.selectedActivityController.isValid(),
				accountIsValid  = Km.selectedAccountController.isValid();
			if (activityIsValid 
					&& accountIsValid) {
				var actKey = Km.selectedActivityController.getKey(),
					accntKey = Km.selectedAccountController.getKey();
				this.loadOverview(actKey, accntKey);
			}
			e.preventDefault();			
		},

		loadOverview: function (actKey, accntKey) {

			var keyPair = actKey + '.' + accntKey;
			$.getJSON('data/key2tag.json', function(data) {
				$(data).each(function(i,p) {
					if (keyPair === String(p.keypair)) {
						console.log(p.tag);
						Km.overviewController.set('tag', p.tag)

					}
				});
			});
		}
	})
	
});

Km.OverView = Em.View.extend({
	templateName: 'overview',
	contentBinding: 'Km.overviewController'
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
