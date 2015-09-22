var app = angular.module('indomates', []);

app.controller('MainController', function($scope, $http) {
  $http.get('/user').success(function(data) {
    $scope.user = data;
  });
});
