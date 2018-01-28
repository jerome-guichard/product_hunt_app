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
            getList: getList,
            getNewerPostList: getNewerPostList,
            getOlderPostList:getOlderPostList
            
        };

        return service;
        
        // Get all post list
        function getList(additionalParam){

            var deferred = $q.defer();
            // if additionalParam is not defined, define it as ''
            if(typeof additionalParam === 'undefined'){additionalParam='';}
            
            // http request
            $http({
                //Endpoint: posts?all
                //Request string: sort posts by creation date in a descending order 
                //Request string: limit the number of results
                //Additional Request string: get post older/older than a given post 
                url: url+'posts/all?sort_by=created_at&order=desc&per_page='+postPerPage+additionalParam,
                method: 'GET',
                }).success(function(data,status,headers,config){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("null");
                });

            return deferred.promise;
        }
        
        // Get newer posts than the post represented by its id
        function getNewerPostList(id){
            return getList('&newer='+id.toString());
        }
        
        // // Get older posts than the post represented by its id
        function getOlderPostList(id){
            return getList('&older='+id.toString());
        }
    }
 
