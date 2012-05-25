/************************** 
* Application 
**************************/
Km = Em.Application.create({
	rootElement: $('#selctor-app'),
	activitys: [],
	accounts: [],
	ready: function() {
		this.set('activitys', Km.store.findAll(Km.Activity));
		this.set('accounts', Km.store.findAll(Km.Account));
		this._super();	
	}
});

Km.store = DS.Store.create({
	revision: 4,
	adapter: DS.Adapter.create({
		findAll: function (store, type) {
				var url = type.url;
				jQuery.getJSON(url, function(data) {
					store.loadMany(type, data);
			});
		}
	})
});



/************************** 
* Models 
**************************/
Km.Activity = DS.Model.extend({
	name: DS.attr('string'),
	showAlias: false,
	triggerAlias: function (selectedAccntID, arr) {
		if (jQuery.inArray(selectedAccntID, arr)) {
			this.set('showAlias', true);
		}
	}
});

Km.Activity.reopenClass({
	url: 'data/activitys.json'
});


Km.Account = DS.Model.extend({
	primaryKey: '_id',
	name: DS.attr('string')
});

Km.Account.reopenClass({
	url: 'data/accounts.json'
})

/************************** 
* Views
**************************/
Km.ActivityView = Em.View.extend({
	
});

Km.AccountView = Em.View.extend({
	
});


/************************** 
/* Controllers 
/**************************/
// Km.activityController = Em.ArrayProxy.create({
	
// 	init: function () {
// 		this.set('content', Km.store.findAll(Km.store,Km.Activity));
// 	}
// });

// Km.accountsController = Em.ArrayProxy.create({

// 	content:[],

// 	loadAccounts: function () {
// 		var self = this;
// 		$.getJSON('data/accounts.json', function(data) {
			
// 			data.forEach(function(item) {
// 				self.pushObject(Km.Account.create(item));
// 			});
// 		});
// 	}

// });
