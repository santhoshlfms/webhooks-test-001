var app = angular.module("app", []);


app.controller('eventsController', function($scope,$http){

$scope.eventsData = [];

$scope.getEventsData = function() {
    $http.get('/webhook/get-icici-events').then(function(data){
        console.log(data.data);
            $scope.eventsData = data.data;
    });    
}

$scope.getEventsData();

});