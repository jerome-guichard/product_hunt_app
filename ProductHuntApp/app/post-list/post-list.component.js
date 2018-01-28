'use strict';

// Register `postList` component, along with its associated controller and template
angular.
  module('postList').
  component('postList', {
    templateUrl: 'post-list/post-list.template.html',
    controller: ['PostService','CommentService','appEnv','$scope','$log',
      function PostListController(PostService,CommentService,appEnv,$scope,$log) {
          
        // Init posts structure
        $scope.posts = [];
        
        // Get latest posts on page load
        getPostList(1);
        
        // Pagination settings
        $scope.pagination = {
            currentPage: 1,
            numPerPage :appEnv.postPerPage,
            maxSize: 5,
            totalPost: 1000
        };
        
        // Detect chqnges in pagination
        $scope.pageChanged = function() {
            // Get new list of post
            getPostList($scope.currentPage);
        };
        
        // Retrieve comments
        $scope.getComments = function(post){
            // Get range of date to display
            var startDate = new Date(post.created_at);
            var endDate = new Date(startDate);
            endDate.setDate(startDate.getDate()+7);
            
            CommentService.getList(post.id).then(function(data) {
                console.log(data.comments);
                
                var fiteredComment = CommentService.filterCommentsByDate(data.comments, endDate);
                
                console.log(fiteredComment);
            });
        };
        
        // Get list of post
        function getPostList(pageId){                   
            PostService.getList(pageId).then(function(data) {s
                console.log(data);
                // Bind list of posts
                $scope.posts.list =data.posts;
            });
        };
      }
    ]
  });
