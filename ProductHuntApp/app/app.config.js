'use strict';

angular.
    module('productHuntApp').
    // Define app constants
    constant(
	"appEnv", {
            // Developer token provided by Product Hunt
            dev_token:"a6da618242594426b74350b7048d2022308f5a5e5e286fad05a981025382b619",
            // url of PH API
            url:"https://api.producthunt.com/v1/",
            // Enable/Disable logger
            log:true
    }).
    // route configuation
    config(['$locationProvider' ,'$routeProvider',
            
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            
            // Always route to URL+/posts 
            $routeProvider.
                when('/posts', {
                    template: '<post-list></post-list>'
                }).
                otherwise('/posts');
        }
    ]).
    // Automatically provide Authorization token for each request 
    config(["$httpProvider","appEnv",
        function($httpProvider,appEnv) {
            $httpProvider.defaults.headers.common['Authorization'] = "Bearer " + appEnv.dev_token;
    }])

    // Logger Enabled/Disabled depending on param in constant
    .config(['$logProvider','appEnv',
        function($logProvider, appEnv){
            $logProvider.debugEnabled(appEnv.log);
    }])
  

  
