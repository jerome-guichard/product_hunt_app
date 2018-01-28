'use strict';

angular.
    module('core.comment').
    factory('CommentService', CommentService);
    CommentService.$inject =  ['appEnv','$http','$q'];
  
    function CommentService(appEnv,$http,$q) {
        
        var url = appEnv.url;
        
        var service = {
            // DATA
            getList: getList,           
        };

        return service;
        
        // Get all post list
        function getList(postId){

            var deferred = $q.defer();         
            // http request
            $http({
                //Endpoint: posts?all
                //Request string: sort posts by creation date in a descending order 
                //Request string: limit the number of results
                //Additional Request string: get post older/older than a given post 
                url: url+'comments?search[post_id]='+postId+'&sort_by=created_at&order=asc',
                method: 'GET',
                }).success(function(data,status,headers,config){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("null");
                });

            return deferred.promise;
        }
        
    }
 
