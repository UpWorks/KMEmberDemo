/************************** 
* Application 
**************************/
Km = Em.Application.create({
	//assign app to El
	rootElement: $('#kmapp')
});

/************************** 
* Models 
**************************/
Km.Activity = Em.Object.extend({
	id: null,
	name: null,
	activitynames: [],
	isHidden: false,
	hideThis: function () {
		var actArr = this.get('activitynames'),
			actCnt = actArr.length,
			actHiddenCnt = 0;
		actArr.forEach(function(data) {
			if (data.isHidden) {
				actHiddenCnt ++;
			}
		});
		if (actHiddenCnt === actCnt) {
			return this.set('isHidden', true);
		} else {
			return this.set('isHidden', false);
		}
	}.observes('Km.selectedAccountController.id')
});

Km.ActivityName = Em.Object.extend({
	id: null,
	name: null,
	aliasname: null,
	showaliasonid: [],
	parent_id: null,
	hideonaccount_ids: [],
	isHidden: false,
	showAlias: false,
	hideActivity: function() {
		var hideArr = this.get('hideonaccount_ids'),
			selectedKey = Km.selectedAccountController.getAccountKey();
		if (hideArr !== null 
				&& hideArr.contains(parseFloat(selectedKey))) {
			return this.set('isHidden', true);
		} else {
			return this.set('isHidden', false);
		}
	}.observes('Km.selectedAccountController.id'),
	checkAlias: function () {
		var showArr = this.get('showaliasonid'),
			selectedKey = Km.selectedAccountController.getAccountKey();
		if (showArr !== null 
				&& showArr.contains(parseFloat(selectedKey))) {
			return this.set('showAlias', true);
		} else {
			return this.set('showAlias', false);
		}
	}.observes('Km.selectedAccountController.id')
});

Km.Account = Em.Object.extend({
	id: null,
	name: null,
	accounttypes: []
});

Km.AccountType = Em.Object.extend({
	id: null,
	name: null,
	parent_id: null,
	hideonactivity_ids: [],
	isHidden: false,
	hideActivity: function() {
		var hideArr = this.get('hideonactivity_ids'),
			selectedKey = Km.selectedActivityController.getActivityKey();
		if (hideArr !== null 
				&& hideArr.contains(parseFloat(selectedKey))) {
			return this.set('isHidden', true);
		} else {
			return this.set('isHidden', false);
		}
	}.observes('Km.selectedActivityController.id')
});

/************************** 
/* Controllers 
/**************************/
Km.activitysController = Em.ArrayProxy.create({
	content: [],
	loadActivities: function () {
		var self = this;
		$.getJSON('data/activitys.json', function(data) {
			$(data).each(function(i,a) {
				var activitynames = [];
				$(a.activitynames).each(function(i,n) {
					var activityname = Km.ActivityName.create({
						id: n.id,
						name: n.name,
						aliasname: n.aliasname,
						showaliasonid: n.showaliasonid,
						parent_id: n.parent_id,
						hideonaccount_ids: n.hideonaccount_ids
					});
					activitynames.push(activityname);
				});
				var activity = Km.Activity.create({
					id: a.id,
					name: a.name,
					activitynames: activitynames
				});
				self.pushObject(activity);
			});
		});
	},
	init: function() {
		this._super();
		this.loadActivities();
	}
});

Km.accountsController = Em.ArrayProxy.create({
	content: [],
	loadAccounts: function () {
		var self = this;
		$.getJSON('data/accounts.json', function(data) {
			$(data).each(function(i,a) {
				var accounttypes = [];
				$(a.accounttypes).each(function(i,n) {
					var accounttype  = Km.AccountType.create({
						id: n.id,
						name: n.name,
						parent_id: n.parent_id,
						hideonactivity_ids: n.hideonactivity_ids
					});
					accounttypes.push(accounttype);
				});
				var account = Km.Account.create({
					id: a.id,
					name: a.name,
					accounttypes: accounttypes
				});
				self.pushObject(account);
			});
		});
	},
	init: function() {
		this._super();
		this.loadAccounts();
	}
});

Km.selectedActivityController = Em.Object.create({
	id: null,
	name: null,
	aliasname: null,
	showaliasonid: [],
	parent_id: null,
	hideonactivity_ids: [],
	isValid: function () {
		return !Em.empty(this.get('id')) 
				&& !Em.empty(this.get('parent_id'));
	},
	getKey: function () {
		if(this.isValid) {
			var key = String(this.get('parent_id')) + String(this.get('id'));
			return key;
		}
	},
	getActivityKey: function () {
		if(this.isValid) {
			var key = String(this.get('parent_id')) + '.' + String(this.get('id'));
			return key;
		}
	}
});

Km.selectedAccountController = Em.Object.create({
	id: null,
	name: null,
	parent_id: null,
	hideonactivity_ids: [],
	isValid: function () {
		return !Em.empty(this.get('id')) 
				&& !Em.empty(this.get('parent_id'));
	},
	getKey: function () {
		if(this.isValid) {
			var key = String(this.get('parent_id')) + String(this.get('id'));
			return key;
		}
	},
	getAccountKey: function () {
		if(this.isValid) {
			var key = String(this.get('parent_id')) + '.' + String(this.get('id'));
			return key;
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
		selectedActivity: Em.Object.create({
			id: null,
			name: 'Select Activity',
			aliasname: null,
			showaliasonid: [],
			parent_id: null,
			hideonactivity_ids: [],
			showAlias: false
		}),	
		dropdownToggle: function (e) {
			this.toggleProperty('isOpen');
			e.stopPropagation();
			e.preventDefault();
		},
		didInsertElement: function () {
			var self = this;
			$('body, a.btn2').on('click', function() {
				self.set('isOpen', false);
			});
		},
		select: function (e) {
			var id = e.context.id,
				name = e.context.name,
				aliasname = e.context.aliasname,
				showaliasonid = e.context.showaliasonid,
				parent_id = e.context.parent_id,
				hideonactivity_ids = e.context.hideonactivity_ids,
				selected = e.context,
				overview = Km.overviewController;
			overview.reset();
			this.content.setEach('isActive', false);
			this.set('selectedActivity', selected);
			Km.selectedActivityController.setProperties({
				id: id,
				name: name,
				aliasname: aliasname,
				showaliasonid: showaliasonid,
				parent_id: parent_id,
				hideonactivity_ids: hideonactivity_ids
			});
			this.set('isOpen', false);
			e.preventDefault();
			if (this._parentView.debug) {
				var parentActivity = Km.activitysController.objectAt(parent_id-1),
					parentActivityName = parentActivity.name;
				console.log(e.context);
				console.log(this.selectedActivity);
				console.log(parent_id);
				console.log(id);
				console.log(parentActivityName + ' >> ' + parentActivity.activitynames[id-1].name);
				console.log('Parent_ID ' + Km.selectedActivityController.parent_id + 
							' Child_ID ' + Km.selectedActivityController.id);
				console.log(Km.selectedActivityController);
			}
		}
	}),

	accountSelect: Em.View.extend({	
		isOpen: false,
		selectedAccount: Em.Object.create({
			id: null,
			name: 'Select Account',
			parent_id: null
		}),		
		dropdownToggle: function (e) {
			this.toggleProperty('isOpen');
			e.stopPropagation();
			e.preventDefault();
		},
		didInsertElement: function () {
			var self = this;
			$('body, a.btn1').on('click', function() {
				self.set('isOpen', false);
			});
		},
		select: function (e) {

			var id = e.context.id,
				name = e.context.name,
				parent_id = e.context.parent_id,
				selected = e.context,
				hideonactivity_ids = e.context.hideonactivity_ids,
				overview = Km.overviewController;
			e.preventDefault();
			overview.reset();
			Km.selectedAccountController.setProperties({
				id: id,
				name: name,
				parent_id: parent_id,
				hideonactivity_ids: hideonactivity_ids
			});
			this.content.setEach('isActive', false);
			this.set('selectedAccount', selected);
			this.set('isOpen', false);
			if (this._parentView.debug) {
				var parentAccount = Km.accountsController.objectAt(parent_id-1),
					parentAccountName = parentAccount.name;
				console.log(parent_id);
				console.log(id);
				console.log(parentAccountName + ' >> ' + parentAccount.accounttypes[id-1].name);
				console.log('Parent Id ' + Km.selectedAccountController.parent_id + 
							' Child Id ' + Km.selectedAccountController.id);
				console.log(Km.selectedAccountController);
			}
			
		}

	}),

	goButton: Em.View.extend({	
		isDisabled: true,
		validCheck: function () {
			var activityIsValid = Km.selectedActivityController.isValid(),
				accountIsValid  = Km.selectedAccountController.isValid();
			if (activityIsValid 
					&& accountIsValid) {
				return this.set('isDisabled', false);
			} else { 
				return this.set('isDisabled', true);
			}
		}.observes('Km.selectedAccountController.id', 'Km.selectedActivityController.id'),
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
