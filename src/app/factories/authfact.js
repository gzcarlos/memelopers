app.factory('authFact', ["$cookieStore", function($cookieStore) {
    var authFact = {};
    authFact.IsSignedIn = function(){
        return (typeof($cookieStore.get("userObj")) !== 'undefined');
    };
    authFact.setToribAccessToken = function(accessToken){
        $cookieStore.put("toribAccessToken", accessToken);
    };
    authFact.getToribAccessToken = function(){
        return $cookieStore.get("toribAccessToken");
    };
    authFact.setAccessToken = function(accessToken){
        $cookieStore.put("accessToken", accessToken);
    };
    authFact.getAccessToken = function(){
        return $cookieStore.get("accessToken");
    };
    authFact.setUserObject = function(userObj){
        $cookieStore.put("userObj", userObj);
    };
    authFact.getUserObject = function(){
        return $cookieStore.get("userObj");
    };
    authFact.signOut = function(){
        $cookieStore.remove("userObj");
        $cookieStore.remove("accessToken");
    };
    return authFact;
}]);