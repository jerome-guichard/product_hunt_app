'use strict';

angular.
    module('core.post').
    factory('PostService', PostService);
    PostService.$inject =  ['appEnv','$http','$q'];
  
    function PostService(appEnv,$http,$q) {
        
        var url = appEnv.url;
        
        var service = {
            // DATA
            getList: getList
            
        };

        return service;
        
        // Get all post list
        function getList(daysAgo){

            var deferred = $q.defer();

            $http({

                url: url+'posts?days_ago='+daysAgo,
                method: 'GET',

                }).success(function(data,status,headers,config){
                    //$log.debug("Get Segment List");
                    deferred.resolve(data);

                }).error(function(){
                    //$log.debug('Error trying to get segment List');
                    //data = "null";
                    deferred.reject("null");
                });

            return deferred.promise;
        }
        
    }
 
