KM Web Activity Account Selector (Quick Search)
===========

Requirements:

Activity Selector - 

This selector displays a hierarchal list of activities and related activity types.

List has a default display state that is mutable based on an account selection from the Account Selector.
	
	Mutations:

		Activity type may have up to one alias name and be display based on account section.

		Activity type can be hidden from list based on account selection.


Account Selector -

This selector displays a hierarchal list of accounts and related account types.

List has a default display state that is mutable based on an activity selection from the Account Selector.
	
	Mutations:

		Activity type can be hidden from list based on account selection.

Go Button -

Action button that upon initial display is disabled. Upon user selecting both an activity type and account 
type the button is enabled. 

When clicked the selected activity and and selected account ids are passed to the Load Overview handler.


Load Overview -

The selected account type id and selected activity id are combined to form a key to look up the related overview tag.

This tag is used in an AJAX request to INSERT_PAGE_OR_API_HERE. Overview HTML is returned to the load overview

function to be injected into the page at appropriate div.

