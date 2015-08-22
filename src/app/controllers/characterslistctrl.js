app.controller("CharactersListCtrl", ["$scope", "$rootScope", "$window", "$q", "$http", function($scope, $rootScope, $window, $q, $http){
    $scope.memes = [];
    $scope.init = function(){
        $http.get($rootScope.server.api_base_url+'memelopers/memes/list').success(function(data){
            $scope.memes = data;
        });
    }; 
}]);