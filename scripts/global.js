$(document).ready(function(){

    $('nav li a').click(function(e){
        
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    
    });

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });
});