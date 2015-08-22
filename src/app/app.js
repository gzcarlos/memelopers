var app = angular.module('MemelopersApp', ['ngRoute', 'ngAnimate', 'ngCookies', 'cgBusy', 'djds4rce.angular-socialshare']);
app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/creation/list.html',
            controller: 'CreationListCtrl'
        })
        .when('/characters', {
            templateUrl: 'app/views/characters/list.html',
            controller: 'CharactersListCtrl'
        })
        .when('/account/signin', {
            templateUrl: 'app/views/account/signin.html',
            controller: 'SignInCtrl'
        })
        .when('/creation/create', {
            templateUrl: 'app/views/creation/create.html',
            controller: 'CreationCreateCtrl'
        })
        .when('/creation/details/:id', {
            templateUrl: 'app/views/creation/details.html',
            controller: 'CreationDetailsCtrl'
        })
        .when('/creations/details/:id', {
            redirectTo: '/creation/details/:id'
        })
        .otherwise({
            templateUrl: 'app/views/404.html',
        });
    $locationProvider.html5Mode({
        enabled: true
    });
}]);
app.run(["$rootScope", "$location", "authFact", "$FB", function($rootScope, $location, authFact, $FB){
    $FB.init({ appId:'835580963189844', cookie:true, xfbml:true, version:'v2.3' });
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route.authenticated){
            var userAuth = authFact.getAccessToken();
            if(!userAuth){
                $location.path('/');
            }
        }
    });
    $rootScope.server = {
        api_base_url: '//api.torib.local/',
        api_client_id: 'webzone',
        api_client_secret: '8fefd5e0a1f3a2faf1d7d570cb05c29a'
    };
}]);
/*
app.value("server_data", {
    api_base_url: '//api.torib.local/',
    api_client_id: 'webzone',
    api_client_secret: '8fefd5e0a1f3a2faf1d7d570cb05c29a'
});*/