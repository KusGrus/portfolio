$(document).ready(function(){
    $(".header__burger").on("click", function(){
        $(this).toggleClass("close");
        $(".header__menu").toggleClass("active");
        $("body").toggleClass("lock");
    })
});