$(document).ready(function () {
    let period = 700;
    let autoslider = setInterval(next, 3500);
    let sliderLen = $(".slider").children().length;

    // Инициализация навигации
    (function () {
        for (i = 0; i < sliderLen; i++) {
            $(".navigation").append('<div class="point"></div>');
        }
        $(".point").eq(0).addClass("current");
    })();

    // Листаем вперед (используя стрелки)
    $(".next").on("click", function () {
        clearInterval(autoslider);
        next();
    });

    // Листаем назад (используя стрелки)
    $(".previous").on("click", function () {
        clearInterval(autoslider);
        previous();
    });


    // Листаем, используя панель навигации
    $(".point").on("click", function (event) {
        clearInterval(autoslider);

        let currentNav = $(".point.current");
        let currentImg = $(".img.current");
        let targetIndex = $(this).index();
        let targetNav = $(".point").eq(targetIndex);
        let targetImg = $(".img").eq(targetIndex)
        

        currentImg.fadeOut(period);
        currentImg.removeClass("current");

        targetImg.fadeIn(period);
        targetImg.addClass("current");

        currentNav.removeClass("current");
        targetNav.addClass("current");
        
    });

    
    function next() {
        let currentImg = $(".img.current");
        let currentNav = $(".point.current");
        let currentImgIndex = $(".img.current").index();
        let nextImgIndex = currentImgIndex + 1;
        let nextImg = $(".img").eq(nextImgIndex);
        let nextNav = $(".point").eq(nextImgIndex);
        currentImg.fadeOut(period);
        currentImg.removeClass("current");
        currentNav.removeClass("current");

        if (nextImgIndex == sliderLen) {
            $(".img").eq(0).fadeIn(period);
            $(".img").eq(0).addClass("current");
            $(".point").eq(0).addClass("current");
   
        } else {
            nextImg.fadeIn(period);
            nextImg.addClass("current");
            nextNav.addClass("current");
        }
    }

    function previous() {
        let currentImg = $(".img.current");
        let currentNav = $(".point.current");
        let currentImgIndex = $(".img.current").index();
        let prevImgIndex = currentImgIndex - 1;
        let prevImg = $(".img").eq(prevImgIndex);
        let prevNav = $(".point").eq(prevImgIndex);
        currentImg.fadeOut(period);
        currentImg.removeClass("current");
        currentNav.removeClass("current");
        prevImg.fadeIn(period);
        prevImg.addClass("current");
        prevNav.addClass("current");
    }


});
