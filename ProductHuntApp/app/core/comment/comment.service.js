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
            filterCommentsByDate: filterCommentsByDate,
            formatDataComments: formatDataComments
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
                //url: url+'comments?search[post_id]='+postId+'&sort_by=created_at&order=asc',
                
                url: url+'posts/'+postId+'/comments',
                method: 'GET',
                }).success(function(data,status,headers,config){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("null");
                });

            return deferred.promise;
        }
        
        
        function filterCommentsByDate(comments,limitDate){
            
            var chartStruct = [];
            //Populate structure for the chart
            for(var comIdx = 0; comIdx<comments.length; comIdx++){
                
                // date of the comments
                var comDate = comments[comIdx];  
                //if com date is beyond the limit break loop and return the struct
                if(comDate < limitDate ){
                    chartStruct.push({'date':comDate,'count':comIdx+1})
                }else{
                    break;
                }
            }
            
            return chartStruct;
        }
        
        // Comments from API are nested, we need to transform into a plain object array
        // Side-effect : sorting in data is broken 
        function formatDataComments(comments){
            
            // Declare new array of comments
            var formattedComments = [];
            
            // Iterate over comment array
            for(var comIdx = 0; comIdx<comments.length; comIdx++)
            {
                // Extract only the date of the comment
                formattedComments.push(new Date(comments[comIdx].created_at));
                
                // There are only 2 levels, so we can iterate directly without recursive call
                if(comments[comIdx].child_comments_count > 0)
                {   // Add child comments to comments array
                    for(var childComIdx = 0; childComIdx<comments[comIdx].child_comments.length;childComIdx++ ){
                        formattedComments.push(new Date(comments[comIdx].child_comments[childComIdx].created_at)); 
                    }
                }
            }
            
            // sort date in asc order
            var date_asc_sort  = function (date1, date2) {
                if (date1 > date2) return 1;
                if (date1 < date2) return -1;
                return 0;
            };
            
            // return sorted array
            return formattedComments.sort(date_asc_sort);
        }
        
    }
 
