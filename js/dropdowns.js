/************************** 
* Application 
**************************/
Km = Em.Application.create({
	rootElement: $('#kmselector')
});
Km.store = DS.Store.create({
	revision: 4,
	adapter:  DS.Adapter.create({
		findAll: function (store, type) {
			var url = type.url;
			console.log('run');
			$.getJSON(url, function(data) {
				store.loadMany(type, data);
			});
		},
		find: function ( store, type, id) {
			var url = type.url;
			$.getJSON(url, function(data) {
			
			var objFiltered =[];

            for (var key in data) {
              var value = data[key];
                if (typeof value == 'object') {
                  if (value instanceof Array) {
                      //future use
                      for (var i = 0; i < value.length; i++) {
                          var item = value[i];
                          console.log(item);
                      }
                   } else {
                       if(value instanceof Object) {
                           //construct one dimensional object
                           //objFiltered.push(value);
                           //console.log(value.activitytypes);
                           console.log(value);

                       }
                    }
                } else {
                    //future use
                    //plain Text;
                }
            }

			});

		}
	})
});
/************************** 
* Models 
**************************/
Km.Activity = DS.Model.extend({
	name: DS.attr('string'),
	activitytypes: DS.hasMany('Km.ActivityType', { embedded: true }),

});
Km.Activity.reopenClass({
	url: 'data/activitys.json'
});

Km.ActivityType = DS.Model.extend({
	name: DS.attr('string'),
	aliasname: DS.attr('string'),
	activity: DS.belongsTo('Km.Activity')
});

Km.ActivityType.reopenClass({
	url: 'data/activitys.json'
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
		this.set('content', Km.store.findAll(Km.Activity));
	}
});


Km.activitysController.loadActivities();

Km.selectedActivityController = Em.Object.create({
	key: null
});

/************************** 
* Views
**************************/
Km.DropDown = Em.View.extend({
	
	templateName: 'dropdown',

	activitySelect: Em.View.extend({
		
		isOpen: false,
		
		selected: Em.Object.create({name: 'Select Activity', value:''}),
		
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
			var selected = e.context;
			console.log(e.context);
			this.content.setEach('isActive', false);
			this.set('selected', selected);
			//selected.set('isActive', true);
			this.set('isOpen', false);
		}

	})
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
