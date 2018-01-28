'use strict';

// Register `postList` component, along with its associated controller and template
angular.
  module('postList').
  component('postList', {
    templateUrl: 'post-list/post-list.template.html',
    controller: ['PostService','$scope','$log',
      function PostListController(PostService,$scope,$log) {
          
        // Init posts structure
        $scope.posts = [];
        // Get latest posts on page load
        getPostList();
       
       // Function triggered on "days ago" select change 
       $scope.getNewerPostList = function() {
           // Retrieve newer posts (newer than the current older post) 
           PostService.getNewerPostList($scope.posts.currentNewerPostId ).then(function(data) {
               // Bind new list of post 
               $scope.posts.list =data.posts;
                // Update scope values 
                $scope.posts.currentNewerPostId = $scope.posts.list[0].id;
                $scope.posts.currentOlderPostId = $scope.posts.list[$scope.posts.list.length-1].id;
            });
        }
        
        $scope.getOlderPostList = function() {
           // Retrieve older posts (older than the current older post) 
           PostService.getOlderPostList($scope.posts.currentOlderPostId).then(function(data) {
                // Bind new list of post
                $scope.posts.list =data.posts;
                // Update scope values 
                $scope.posts.currentNewerPostId = $scope.posts.list[0].id;
                $scope.posts.currentOlderPostId = $scope.posts.list[$scope.posts.list.length-1].id;
                
            });
        }
        
        function getPostList(){                   
            PostService.getList().then(function(data) {
                console.log('Get latest posts');
                console.log(data);
                
                // Bind list of posts
                $scope.posts.list =data.posts;
                // Store latest post id to disable 'next button' when the current newer post id is the latest
                $scope.posts.latestPostId = $scope.posts.list[0].id;
                // Update scope values 
                $scope.posts.currentNewerPostId = $scope.posts.list[0].id;
                $scope.posts.currentOlderPostId = $scope.posts.list[$scope.posts.list.length-1].id;;

            });
        }
      }
    ]
  });
