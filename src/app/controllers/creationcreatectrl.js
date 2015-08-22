app.controller("CreationCreateCtrl", ["$scope", "$rootScope", "$window", "$q", "$http", "$location", "$httpParamSerializer", "authFact", function($scope, $rootScope, $window, $q, $http, $location, $httpParamSerializer, authFact){
    $scope.memeTopCaption = "Estudia";
    $scope.memeBottomCaption = "para ser como yo";
    $scope.imageUrl = "../assets/img/memes/pinedax.jpg";
    $scope.fontSize = 48;
    $scope.message = "Un momento, cargando...";
	$scope.backdrop = true;
	$scope.promise = null;
    $scope.publishingPromise = null;
    $scope.memes = [];
    $scope.IsSignedIn = function(){
        return authFact.IsSignedIn();
    };
    $scope.init = function(){
        paintCanvas();
        $http.get($rootScope.server.api_base_url+'memelopers/memes/list').success(function(data){
            $scope.memes = data;
        });
    };    
    $scope.changeCaption = function() {
        paintCanvas();
    };
    $scope.changeMeme = function(newMeme){
        $scope.imageUrl = newMeme.url;
        $scope.promise = paintCanvas();
    };

    $scope.publish = function(){
        $scope.publishingPromise = $q(function(resolve, reject) {
            if(authFact.IsSignedIn()){
                var canvas = document.getElementById("imgMeme");
                var imageData = canvas.toDataURL();
                var accessToken = authFact.getToribAccessToken();
                var url = $rootScope.server.api_base_url+"memelopers/creations/create";
                var postData =  $httpParamSerializer({
                    grant_type: '',
                    client_id: $rootScope.server.api_client_id,
                    client_secret: $rootScope.server.api_client_secret,
                    code: accessToken,
                    top: $scope.memeTopCaption,
                    bottom: $scope.memeBottomCaption,
                    meme_id: 1,
                    created_by: 3,
                    image_data: imageData
                });
                $http.post(url, postData, {
                    headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).success(function(data){
//                    resolve();
                    $location.path('/creation/details/'+data.id);
                });
            }else{
                reject();
            }
        });
    };
    /* [
        {
            "title":"laughing_men_in_suits",
            "description":"",
            "url": "../assets/img/memes/laughing_men_in_suits.png",
            "thumb_url": "../assets/img/memes/thumbnails/laughing_men_in_suits.png"
        },
        {
            "title":"pinedax",
            "description":"",
            "url": "../assets/img/memes/pinedax.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/pinedax.jpg"
        },
        {
            "title":"billgates",
            "description":"",
            "url": "../assets/img/memes/bill_gates.png",
            "thumb_url": "../assets/img/memes/thumbnails/bill_gates.png"
        },
        {
            "title":"engineering_teacher",
            "description":"",
            "url": "../assets/img/memes/engineering_teacher.png",
            "thumb_url": "../assets/img/memes/thumbnails/engineering_teacher.png"
        },
        {
            "title":"picard_facepalm",
            "description":"",
            "url": "../assets/img/memes/picard_wtf.png",
            "thumb_url": "../assets/img/memes/thumbnails/picard_wtf.png"
        },
        {
            "title":"evil_toddler",
            "description":"",
            "url": "../assets/img/memes/evil_toddler.png",
            "thumb_url": "../assets/img/memes/thumbnails/evil_toddler.png"
        },
        {
            "title":"picard_facepalm",
            "description":"",
            "url": "../assets/img/memes/picard_facepalm.png",
            "thumb_url": "../assets/img/memes/thumbnails/picard_facepalm.png"
        },
        {
            "title":"bad_luck_brian",
            "description":"",
            "url": "../assets/img/memes/bad_luck_brian.png",
            "thumb_url": "../assets/img/memes/thumbnails/bad_luck_brian.png"
        },
        {
            "title":"one_does_not_simply",
            "description":"",
            "url": "../assets/img/memes/one_does_not_simply.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/one_does_not_simply.jpg"
        },
        {
            "title":"net_noob",
            "description":"",
            "url": "../assets/img/memes/net_noob.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/net_noob.jpg"
        },
        {
            "title":"condesending_wonka",
            "description":"",
            "url": "../assets/img/memes/condesending_wonka.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/condesending_wonka.jpg"
        },
        {
            "title":"epic_kid",
            "description":"",
            "url": "../assets/img/memes/epic_kid.png",
            "thumb_url": "../assets/img/memes/thumbnails/epic_kid.png"
        },
        {
            "title":"false",
            "description":"",
            "url": "../assets/img/memes/false.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/false.jpg"        
        },
        {
            "title":"grandma_finds_internet",
            "description":"",
            "url": "../assets/img/memes/grandma_finds_internet.png",
            "thumb_url": "../assets/img/memes/thumbnails/grandma_finds_internet.png"
        },
        {
            "title":"but_thats_not_my_business",
            "description":"",
            "url": "../assets/img/memes/but_thats_not_my_business.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/but_thats_not_my_business.jpg"
        
        },
        {
            "title":"hey",
            "description":"",
            "url": "../assets/img/memes/hey.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/hey.jpg"
        
        },
        {
            "title":"most_interesting_man_on_earth",
            "description":"",
            "url": "../assets/img/memes/most_interesting_man_on_earth.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/most_interesting_man_on_earth.jpg"
        },
        {
            "title":"neckbeard_guy",
            "description":"",
            "url": "../assets/img/memes/neckbeard_guy.png",
            "thumb_url": "../assets/img/memes/thumbnails/neckbeard_guy.png"
        },
        {
            "title":"paranoid_parrot",
            "description":"",
            "url": "../assets/img/memes/paranoid_parrot.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/paranoid_parrot.jpg"
        },
        {
            "title":"philosoraptor",
            "description":"",
            "url": "../assets/img/memes/philosoraptor.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/philosoraptor.jpg"
        },
        {
            "title":"push_it_somewhere_else",
            "description":"",
            "url": "../assets/img/memes/push_it_somewhere_else.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/push_it_somewhere_else.jpg"
        },
        {
            "title":"redditor",
            "description":"",
            "url": "../assets/img/memes/redditor.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/redditor.jpg"
        },
        {
            "title":"scumbag",
            "description":"",
            "url": "../assets/img/memes/scumbag.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/scumbag.jpg"
        },
        {
            "title":"scumbag_first_year",
            "description":"",
            "url": "../assets/img/memes/scumbag_first_year.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/scumbag_first_year.jpg"
        },
        {
            "title":"tough_spongebob",
            "description":"",
            "url": "../assets/img/memes/tough_spongebob.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/tough_spongebob.jpg"
        },
        {
            "title":"y_u_no",
            "description":"",
            "url": "../assets/img/memes/y_u_no.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/y_u_no.jpg"
        },
        {
            "title":"aliens",
            "description":"",
            "url": "../assets/img/memes/aliens.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/aliens.jpg"
        },
        {
            "title":"disaster_girl",
            "description":"",
            "url": "../assets/img/memes/disaster_girl.png",
            "thumb_url": "../assets/img/memes/thumbnails/disaster_girl.png"
        },
        {
            "title":"too_damn_high",
            "description":"",
            "url": "../assets/img/memes/too_damn_high.png",
            "thumb_url": "../assets/img/memes/thumbnails/too_damn_high.png"
        },
        {
            "title":"futurama_fry",
            "description":"",
            "url": "../assets/img/memes/futurama_fry.jpg",
            "thumb_url": "../assets/img/memes/thumbnails/futurama_fry.jpg"
        },
        {
            "title":"yo_dawg_heard_you",
            "description":"",
            "url": "../assets/img/memes/yo_dawg_heard_you.png",
            "thumb_url": "../assets/img/memes/thumbnails/yo_dawg_heard_you.png"
        },
        {
            "title":"nobody_got_time_for_that",
            "description":"",
            "url": "../assets/img/memes/nobody_got_time_for_that.png",
            "thumb_url": "../assets/img/memes/thumbnails/nobody_got_time_for_that.png"
        }
    ];*/
    var paintCanvas = function(){
        return $q(function(resolve, reject) {
            var canvas = document.getElementById("imgMeme");
            var canvasContainer = document.getElementById("canvas-container");
            var imageObj = new Image();
            imageObj.onload = function() {
                canvas.width = (canvasContainer.clientWidth - 30);
                var deltaRatio = (canvasContainer.clientWidth - 30) / imageObj.width;
                canvas.height = imageObj.height*deltaRatio;
                var x = canvas.width / 2;
                var y = canvas.height *0.75;
                var context = canvas.getContext("2d");
                context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,0,0, canvasContainer.clientWidth - 30,imageObj.height*deltaRatio);
                context.font = $scope.fontSize+"pt impact";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.textBaseline = "top";
                var topLines = getLines(context, $scope.memeTopCaption.toUpperCase(), canvas.width);
                var fontHeight = ($scope.fontSize*1.5);
                for(var i=0;i<topLines.length;i+=1)
                {
                    context.fillText(topLines[i], x, i*fontHeight);
                    context.strokeText(topLines[i], x, i*fontHeight);
                }
                var bottomLines = getLines(context, $scope.memeBottomCaption.toUpperCase(), canvas.width);
                for(var j=bottomLines.length-1;j>=0;j-=1)
                {
                    context.fillText(bottomLines[bottomLines.length - 1 - j], x, y-(j*fontHeight));
                    context.strokeText(bottomLines[bottomLines.length - 1 - j], x, y-(j*fontHeight));
                }
                var anchorDownload = document.getElementById("anchorDownload");
                anchorDownload.href = canvas.toDataURL();
                resolve();
            };
            imageObj.src = $scope.imageUrl;
        });
    };
    var w = angular.element($window);
    w.bind("resize", function () { paintCanvas(); });
    var getLines = function (ctx, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };
}]);