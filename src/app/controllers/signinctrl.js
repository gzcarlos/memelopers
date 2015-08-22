app.controller("SignInCtrl", ["$scope", "$rootScope", "$timeout", "$http", "$httpParamSerializer", "authFact","userFact", function($scope, $rootScope, $timeout, $http, $httpParamSerializer, authFact, userFact){
    $scope.signedIn = false;
    $scope.user = {};
    $scope.processAuth = function(userData, authResult, provider) {
        $timeout(function(){
            var userObj = {};
            var grantType = 'facebook';
            $scope.signedIn = true;
            if(provider === 'google')
            {
                userObj = userFact.getFromGoogle(userData, authResult);
                grantType = 'google';
            }
            else if(provider === 'facebook')
            {
                userObj = userFact.getFromFacebook(userData, authResult);
            }
            $scope.user = userObj; 
            authFact.setUserObject(userObj);
            authFact.setAccessToken(userObj.accessToken);
            var data = $httpParamSerializer({
                grant_type: grantType,
                client_id: $rootScope.server.api_client_id,
                client_secret: $rootScope.server.api_client_secret,
                code: userObj.accessToken
            });
            var url = $rootScope.server.api_base_url+'oauth/token';
            $http.post(url, data, {
                headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
            }).success(function(data, status, headers, config) {
                authFact.setToribAccessToken(data.access_token);
            });
        });
    }; 
    $scope.FBLogin = function(){
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me?fields=id,name,email,picture', function(response) {
                    var authResult = FB.getAuthResponse();
                    $scope.processAuth(response, authResult,'facebook');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope:'public_profile,email'});
    };
    $scope.SignOut = function(){
        $scope.signedIn = false;
        authFact.signOut();
        FB.getLoginStatus(function(response) {
            if (response && response.status === 'connected') {
                FB.logout();
            }
        });
        //gapi.auth.signOut();
    };
    /*var signInCallback = function(authResult) {
        gapi.auth.setToken(authResult); 
        gapi.client.load('oauth2', 'v2', function() {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(function(response) {
                $scope.processAuth(response, authResult, 'google');
            });
        });
    };
    var renderSignInButton = function() {
        gapi.signin.render('signInButton', {
            'callback': signInCallback,
            'clientid': '689277268188-igd1qq3stmfl5n39dup9ac0qorpl6275.apps.googleusercontent.com',
            'requestvisibleactions': 'http://schemas.google.com/AddActivity',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
            'cookiepolicy': 'single_host_origin'
        });
    };*/
    $scope.start = function() {
        //renderSignInButton();
        $scope.user = authFact.getUserObject();
        $scope.signedIn = authFact.IsSignedIn();
    };
    $scope.start();
}]);