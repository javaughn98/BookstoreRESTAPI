var myApp = angular.module('myApp');
myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
   console.log('Books controller loaded...');

    $scope.getBooks = function() {
        $http.get('/api/books').then(function(response) {
            console.log(response);
            $scope.books = response;
        }, 
        function(err) {
            if(err) {
                throw err;
            }
        });
    }

    $scope.getBook = function() {
        var id = $routeParams.id;
        console.log('id is: '+ id);
        $http.get('/api/books/'+id).then(function(response) {
            console.log(response);
            $scope.book = response.data;
        },
        function(err){
            if(err) {
                throw err;
            }
        });
    }

    $scope.addBook = function() {
        console.log($scope.book);
        $http.post('/api/books/', $scope.book).then(function(response){
            window.location.href= '#!/books';
        },
        function(err) {
            if(err) {
                throw err;
            }
        });    
    }

    $scope.updateBook = function() {
        var id = $routeParams.id;
        $http.put('/api/books/'+id, $scope.book).then(function(response){
            window.location.href= '#!/books';
        },
        function(err) {
            if(err) {
                throw err;
            }
        });    
    }

    $scope.removeBook = function(id) {
        $http.delete('/api/books/'+id).then(function(response){
            window.location.href= '#!/books';
        },
        function(err) {
            if(err) {
                throw err;
            }
        });    
    }
}]);