app.controller("CreationDetailsCtrl", ["$scope", "$rootScope", "$http", "$routeParams", function($scope, $rootScope, $http, $routeParams){
	$scope.creation = {};
	$scope.init = function()
	{
		var url = $rootScope.server.api_base_url+'memelopers/creations/details/'+$routeParams.id;
		$http.get(url).success(function(data){
			$scope.creation = data;
		});
	};
}]);