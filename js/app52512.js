<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]--> <!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]--> <!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]--> <!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>KM Web Activity / Account Selector Widget</title>
	<meta name="description" content="Proof of concept for the KM Web Project: Activty/Account Selector">
	<meta name="author" content="afweb">

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="apple-touch-icon" href="/apple-touch-icon.png">
	<link rel="stylesheet" href="css/style.css?v=2">
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

</head>
<body>
	<div id="selector-app">
	<script type="text/x-handlebars">
		<h2>Activities</h2>
		<ul>			
			{{#each Km.activityController}}
			{{#view Km.ActivityView contentBinding="this"}}
				<li>
					{{content.id}}:{{content.name}}
					<ul>
					{{#each content.activitytypes}}

						<li>
							{{#if _parentView.checkAlias}}

							{{aliasname}}

							{{/if}}

							{{name}}

						</li>
					{{/each}}
					</ul>
				</li>
			{{/view}}	
			{{/each}}
		</ul>
	</script>
	<script type="text/x-handlebars">
		<h2>Accounts</h2>
		<ul>
			{{#view Km.AccountView}}
			{{#each Km.accountController}}
				<li>
					{{name}}
					<ul>
						{{#each accounttypes}}
						
						<li>{{name}}</li>
						{{/each}}
						</ul>
					</li>
				{{/each}}
			{{/view}}
		<ul>
	</script>

	</div>

	<script src="js/libs/jquery-1.7.2.min.js"></script>
	<script src="js/libs/ember-0.9.8.1.min.js"></script>

	<script src="js/app.js"></script>
</body>
</html>
