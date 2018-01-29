'use strict';

// Register `postList` component, along with its associated controller and template
angular.
  module('postList').
  component('postList', {
    templateUrl: 'post-list/post-list.template.html',
    controller: ['PostService','CommentService','appEnv','$scope','$log','$interval',
      function PostListController(PostService,CommentService,appEnv,$scope,$log,$interval) {
          
        // Init posts scope variables
        $scope.posts = [];
        $scope.comments = [];
        // Get latest posts on page load
        getPostList(1);
        
        // Pagination settings
        $scope.pagination = {
            currentPage: 1,
            numPerPage :appEnv.postPerPage,
            maxSize: 5,
            totalPost: 1000
        };
        
        // Detect changes in pagination
        $scope.pageChanged = function() {
            // Get new list of post depending on the page
            getPostList($scope.pagination.currentPage);
        };
        
        // Retrieve comments
        $scope.getComments = function(post){
            
            // Calculate range of date to display
            var startDate = new Date(post.created_at);
            var endDate = new Date(startDate);
            endDate.setDate(startDate.getDate()+appEnv.daysNum);
            
            // bind for graph title
            $scope.comments.postName = post.name;
            
            CommentService.getList(post.id).then(function(data) {
                // first get all comments and convert nested data into plain data
                var sortedComments = CommentService.formatDataComments(data.comments);
                // Then, select only comments created within 7 days (or any constant value defined by dev in config.file) after post creation
                // Comments are returned into an obj: {date;count}
                // Bind comments list to directive
                $scope.comments.list = CommentService.filterCommentsByDate(sortedComments,endDate);
            });
        };
        
        // Get list of post
        function getPostList(pageId){                   
            PostService.getList(pageId).then(function(data) {
                // Bind list of posts
                $scope.posts.list =data.posts;
            });
        };

    }]
  });
