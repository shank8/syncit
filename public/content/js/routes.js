// routes.js

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',
		{
			templateUrl : 'views/home.html',
			controller : 'mainCtrl'
		})
		.when('/about',
		{
			templateUrl : 'views/about.html',
			controller : 'mainCtrl'
		})
		.when('/begin',
		{
			templateUrl : 'views/sync.html',
			controller : 'syncCtrl'
		})
		.when('/sync/:id', {
			templateUrl : 'views/form.html',
			controller : 'formCtrl'
		})
		.otherwise({
			redirectTo : '/'
		});

	if(window.history && window.history.pushState){
    $locationProvider.html5Mode(true);
  }

}]);