'use strict';

angular.
    module('productHuntApp').
    // Define app constants
    constant(
	"appEnv", {
            // Developer token provided by Product Hunt - Please put yours
            dev_token:"",
            // define number of posts per page
            postPerPage:'10',
            // Number of days after post creation to display on graph
            daysNum:7,
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
  

  
