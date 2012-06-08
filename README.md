#KM Web Activity Account Selector (Quick Search)
===========

##Dependencies

###CSS
+ bootstrap.css (Twitter Bootstrap(for drop down styling))

###JavaScript
+ jQuery-1.7.2
+ ember-0.9.8.1


##Activity Selector - 

This selector displays a hierarchal list of activities and related activity types.

List has a default display state showing all activities and activity types that is mutable based on an account selection from the Account Selector.
	
	Mutations:

		Activity type may have up to one alias name with alias name displaying instead of default activity name based on account section.

		Activity type can be hidden from UI based on account selection. If all child activities are hidden, the parent activity is hidden too.

Activities and Child Activities are loaded via a currently static JSON file (data/activitys.json) with the intent that future versions could contain dynamic JSON response.


##Account Selector -

This selector displays a hierarchal list of accounts and related account types.

List has a default display state that is mutable based on an activity selection from the Account Selector.
	
	Mutations:

		Activity type can be hidden from list based on account selection.

Accounts and Child Accounts are loaded via a currently static JSON file (data/accounts.json) with the intent that future versions could contain dynamic JSON response.

##Go Button -

Upon user selecting both an activity type and account type the button is enabled through validation of Activity and Account selections having values. 

When clicked the selected parent activity id, child activity id and and selected parent account id, child account id are used to return a keypair that is passed to the Load Overview handler.


##Load Overview -

The selected account type id and selected activity id are combined to form a key to search a currently static JSON file (data/key2tag.JSON) with the intent that future iterations could contain a dynamic JSON response.

**TODO** 
	Connect an AJAX call to CQ5 AJAX call to retrieve appropriate overview page and assign to Km.overViewController.content
