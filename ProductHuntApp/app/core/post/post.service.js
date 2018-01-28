'use strict';

angular.
    module('core.post').
    factory('PostService', PostService);
    PostService.$inject =  ['appEnv','$http','$q'];
  
    function PostService(appEnv,$http,$q) {
        
        var url = appEnv.url;
        var postPerPage = appEnv.postPerPage;
        
        var service = {
            // DATA
            getList: getList     
        };

        return service;
        
        // Get all post list
        function getList(pageId){

            var deferred = $q.defer();
            
            // http request
            $http({
                //Endpoint: posts?all
                //Request string: page nnumber and per_page number of post
                url: url+'posts/all?page='+pageId.toString()+'&per_page='+postPerPage,
                method: 'GET',
                }).success(function(data,status,headers,config){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("null");
                });

            return deferred.promise;
        }
    }
 
