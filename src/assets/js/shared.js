$(function(){
    $(window).on('scroll', function () {
        if($("#sidebar-ad-unit").width() < 270){
            var scrollPos = $(document).scrollTop();
            $("#sidebar-ad-unit").css({top: scrollPos, position:"absolute"});
        }
    }).scroll();
});