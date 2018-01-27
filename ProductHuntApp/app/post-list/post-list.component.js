'use strict';

// Register `postList` component, along with its associated controller and template
angular.
  module('postList').
  component('postList', {
    templateUrl: 'post-list/post-list.template.html',
    controller: ['PostService','$scope','$log',
      function PostListController(PostService,$scope,$log) {
        
        
        $scope.posts =[];       
        $scope.daysAgo = "0";        
        $scope.cat = "tech";
        
        // Get today's topic on page load
        getPostList($scope.daysAgo);
       
       // Function triggered on "days ago" select change 
       $scope.update = function() {
           console.log("Changes detected");
           getPostList($scope.daysAgo);
        }
        function getPostList(daysAgo){
            
            console.log("Changes detected");
            console.log(daysAgo);          
            PostService.getList(daysAgo).then(function(data) {
                console.log(data);
                $scope.posts =data.posts;
            });
        }
      }
    ]
  });
