angular
  .module("app", [])
  .controller("loginCtrl", function($scope,$http,$window) {  
    $scope.login = function(){
      var req = {
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        headers: {
          'Content-Type': "application/json"
        },
        params: { uname: $scope.username, password: $scope.password }
      }
      $http(req)
        .then(function(res) {
          setUser('123456-456123-64')
          $window.location.href = '/userdashboard';
        })
        .catch(function(err){
          $scope.message = "Error";
        });
    } 
    function setUser(authToken) {
      var user_ob = {
        'auth_token': authToken
      }
      $window.localStorage.setItem('user', JSON.stringify(user_ob));
    }
  })
