app.controller("CreationListCtrl", ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http)
{
	$scope.creations=[];
	$scope.isCreationsEmpty = function()
	{
		return ($scope.creations.length === 0);
	};
	$scope.init = function()
	{
		$http.get($rootScope.server.api_base_url+'memelopers/creations/list').success(function(data, status, headers, config)
		{
			$scope.creations = data;
		});
	};
}]);