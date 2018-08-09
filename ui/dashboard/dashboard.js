angular
  .module("app",[])
  .value('PNotify', PNotify.default)
  .controller("dashboardCtrl", function($scope,$http,$window) {  
    $scope.productlist = []
    isUserAlreadyLoggedIn()
      .then(function(res){
        getProductList()
      })
     .catch(function(err){
      $window.location.href = '/login';
     })
    function getProductList(){
      var req = {
        method: 'GET',
        url: 'http://localhost:3000/api/product',
        headers: {
          'Content-Type': "application/json"
        }
      }
      $http(req)
        .then(function(res) {
          console.log(res)
          $scope.productlist = res.data;
        })
        .catch(function(err){
          console.log(res)
        });
    }
    $scope.addNewProduct = function(){
      console.log(checkForDuplicates())
      if(checkForDuplicates()){
        $scope.errMsg = "Product Already Exist with this name"
        return;
      }
      if( !$scope.sku && 
          !$scope.price && 
          !$scope.isItAvble && 
          !$scope.catagory &&
          !$scope.varient){
            $scope.errMsg = "Please fill all the fields"
            return
          }        
      var req = {
        method: 'POST',
        url: 'http://localhost:3000/api/product',
        headers: {
          'Content-Type': "application/json"
        },
        params: { 
                  sku: $scope.sku, 
                  price: $scope.price, 
                  isavailable: $scope.isItAvble, 
                  prod_cat: $scope.catagory,
                  varient : $scope.varient
                }
      }
      $http(req)
        .then(function(res) {
          angular.element("#newProductModal").modal('toggle');
          getProductList()
          $scope.closeEditProductModal()
          // PNotify.success({ //notifying user 
          //   title: 'Product Added Successfully',
          //   delay: 4000 //notification delay time
          // });
        })
        .catch(function(err){
          $scope.errMsg = "Please Try Again";
        });
    }
    $scope.editProduct = function(){
      if( !$scope.sku && 
          !$scope.price && 
          !$scope.isItAvble && 
          !$scope.catagory &&
          !$scope.varient){
            return
          }        
      var req = {
        method: 'PUT',
        url: 'http://localhost:3000/api/product',
        headers: {
          'Content-Type': "application/json"
        },
        params: { 
                  sku: $scope.sku, 
                  price: $scope.price, 
                  isavailable: $scope.isItAvble, 
                  prod_cat: $scope.catagory,
                  varient : $scope.varient
                }
      }
      $http(req)
        .then(function(res) {
          angular.element("#newProductModal").modal('toggle');
          getProductList()
          $scope.closeEditProductModal()
          $scope.isEditing = false;
          // PNotify.success({ //notifying user 
          //   title: 'Product Added Successfully',
          //   delay: 4000 //notification delay time
          // });
        })
        .catch(function(err){
          $scope.message = "Error";
        });
    }

    $scope.openEditProductModal = function(index){
      $scope.varient = JSON.parse($scope.productlist[index].varient);
      $scope.sku       = $scope.productlist[index].sku;
      $scope.price     = parseInt($scope.productlist[index].price);
      $scope.isItAvble = $scope.productlist[index].isavailable;
      $scope.catagory  = $scope.productlist[index].prod_cat;
      $scope.isEditing = true;
      angular.element("#newProductModal").modal('toggle');
    }

    $scope.closeEditProductModal = function(index){
      $scope.sku       = undefined;
      $scope.price     = undefined;
      $scope.isItAvble = undefined;
      $scope.catagory  = undefined;
      $scope.varient   = undefined;
      $scope.isEditing = false;
      $scope.errMsg    = undefined;
    }

    $scope.deleteProduct = function(index){
      var req = {
        method: 'DELETE',
        url: 'http://localhost:3000/api/product',
        headers: {
          'Content-Type': "application/json"
        },
        params: { sku : $scope.productlist[index].sku }
      }
      $http(req)
        .then(function(res) {
          getProductList()
        })
        .catch(function(err){
          $scope.message = "Error";
        });
    }
    
    $scope.logout = function(){
      $window.localStorage.setItem('user',false)
      $window.location.href = '/login';
    }

    $scope.getKeysforDisplay = function(str){
      var obj_temp = JSON.parse(str);
      var ret_str  = ""
      Object.keys(obj_temp).forEach(function(k){
        ret_str+=" "+k.toString()
      });
      return ret_str;
    }

    function isUserAlreadyLoggedIn() {
      return new Promise(function (resolve, reject) {
        var user = JSON.parse($window.localStorage.getItem('user'));
        user ? resolve(true) : reject(false)
      })
    }

    function checkForDuplicates(){
      return $scope.productlist.some(function(el) {
        return el.sku === $scope.sku;
      }); 
    }
  })
