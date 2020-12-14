const scroller = document.querySelector(".scroller");
const animateItems = document.querySelectorAll(".animate");
setTimeout(animOnScroll, 400)

//Events
document.addEventListener("scroll", showNav);
if (animateItems.length) window.addEventListener("scroll", animOnScroll);
scroller.addEventListener("click", function (event) {
    requestAnimationFrame(goTop);
});

//Functions
function goTop() {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    if (top > 0) {
        window.scrollTo(0, top - 50);
        requestAnimationFrame(goTop);
    }
}

function showNav() {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    let { innerHeight } = window;
    if (top >= innerHeight / 2) {
        scroller.classList.add("show");
        scroller.classList.remove("hide");
    } else {
        scroller.classList.remove("show");
        scroller.classList.add("hide");
    }
}

function animOnScroll() {
    animateItems.forEach(item=>{
        let itemHeight = item.clientHeight; //Высота объекта
        let itemPosition = offset(item).y; //Высота объекта относительно документа
        let part = 4 //n-ая часть объекта, при которой начинается анимация

        let animationStart = window.innerHeight - itemHeight/4; //Координата с которой начинается анимция
        //Если объект больше чем veiwport
        if (itemHeight > window.innerHeight) {
            animationStart = window.innerHeight - window.innerHeight / part;
        }

        if ((window.pageYOffset > itemPosition - animationStart) && (window.pageYOffset < itemPosition+itemHeight)){
            item.classList.add("_active");
        }
        else {
            if (!item.classList.contains('_once')){
                item.classList.remove('_active');
            }
        }
    });
}
function offset(element) {
    const rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { y: rect.top + scrollTop, x: rect.left + scrollLeft };
}
