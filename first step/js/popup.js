$(document).ready(function() {
    $('.popup__close').click(function(event) {
        $('.popup').toggleClass('hidden');
    });
});

$(document).ready(function() {
    $('.header__top img').click(function(event) {
        $('.popup').removeClass('hidden');
    });
});