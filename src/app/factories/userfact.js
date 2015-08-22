app.factory('userFact', function() {
    var userFact = {};
    userFact.getFromFacebook = function(userData, authResult){
        var user = {
            email: userData.email,
            name: userData.name,
            picture: userData.picture.data.url,
            provider: 'facebook',
            accessToken: authResult.accessToken
        };
        return user;
    };
    userFact.getFromGoogle = function(userData, authResult){
        var user = {
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            provider: 'google',
            accessToken: authResult.access_token
        };
        return user;
    };
    return userFact;
});