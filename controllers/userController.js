angular.module('myApp').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.users = [];
    $scope.user = {};
    $scope.editMode = false;
    $scope.currentPage = 1;
    $scope.pageSize = 3;
    $scope.searchQuery = '';
    $scope.sortCriteria = 'name';
  
    $scope.loadUsers = function() {
      UserService.getUsers().then(function(response) {
        $scope.users = response.data;
        $scope.totalPages = Math.ceil($scope.users.length / $scope.pageSize);
        $scope.updatePagination();
      });
    };
  
    $scope.submitUser = function() {
      if ($scope.user.profilePicture && typeof $scope.user.profilePicture === 'object') {
        var reader = new FileReader();
        reader.onloadend = function() {
          $scope.user.profilePicture = reader.result;
          $scope.saveUser();
        };
        reader.readAsDataURL($scope.user.profilePicture);
      } else {
        $scope.saveUser();
      }
    };

    $scope.saveUser = function() {
      if ($scope.editMode) {
        UserService.updateUser($scope.user).then(function() {
          $scope.loadUsers();
          $scope.resetForm();
        });
      } else {
        UserService.addUser($scope.user).then(function() {
          $scope.loadUsers();
          $scope.resetForm();
        });
      }
    };
  
    $scope.editUser = function(user) {
      $scope.user = angular.copy(user);
      $scope.editMode = true;
    };
  
    $scope.deleteUser = function(id) {
      UserService.deleteUser(id).then(function(response) {
        $scope.loadUsers();
      });
    };
  
    $scope.resetForm = function() {
      $scope.user = {};
      $scope.editMode = false;
    };
  
    $scope.setPage = function(page) {
      if (page >= 1 && page <= $scope.totalPages) {
        $scope.currentPage = page;
        $scope.updatePagination();
      }
    };
  
    $scope.updatePagination = function() {
      var start = ($scope.currentPage - 1) * $scope.pageSize;
      var end = start + $scope.pageSize;
      $scope.paginatedUsers = $scope.users.slice(start, end);
    };
  
    $scope.$watch('searchQuery', function() {
      $scope.setPage(1);
  });

  $scope.$watch('sortCriteria', function() {
      $scope.setPage(1);
  });

    $scope.loadUsers();
  }]);
  