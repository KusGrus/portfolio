const corusel = document.querySelector(".corusel");
const images = document.querySelectorAll(".slider img");
const mainSlide = document.querySelector(".first");
const magnifier = document.querySelector(".magnifier");
const sliderSize = images.length;
let navigation;

// Buttom
const prev = document.querySelector(".previous");
const next = document.querySelector(".next");

//Events
prev.addEventListener("click", function (event) {
    auto.stop();
    event.preventDefault();
    moveBack();
    auto.delay(10000);
});

next.addEventListener("click", function (event) {
    auto.stop();
    event.preventDefault();
    moveForward();
    auto.delay(10000);
});

magnifier.addEventListener("click", function () {
    auto.stop();
    let modal = modalWindow();
    modal.create();
    setTimeout(modal.open, 0);
    let exit = document.querySelector(".close");
    exit.addEventListener("click", function () {
        setTimeout(modal.destroy, 0);
        auto.delay(10000);
        exit.removeEventListener("click", this);
    });
});

//AutoRun
let auto = autorun(moveForward);

//Листаем вперед
function moveForward() {
    let currentImage = getCurrentIndex();
    let nextImage = currentImage === sliderSize - 1 ? 0 : currentImage + 1;

    goNext(currentImage, nextImage);

    mainSlide.style.marginLeft = -100 * nextImage + "%";
}

//Листаем назад
function moveBack() {
    let currentImage = getCurrentIndex();
    let prevImage = currentImage - 1 < 0 ? sliderSize - 1 : currentImage - 1;

    goNext(currentImage, prevImage);

    mainSlide.style.marginLeft = -100 * prevImage + "%";
}

function modalWindow() {
    if (!document.querySelector(".modal")) {
        let image = images[getCurrentIndex()].getAttribute("src");
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
        <div class="modal__shadow"></div>
        <div class="modal__img">
            <img src="${image}" alt="modal-image">
            <div class="close"></div>
        </div>
        `;
        return {
            create() {
                document.body.append(modal);
            },
            open() {
                modal.classList.remove("close");
                modal.classList.add("open");
            },
            destroy() {
                modal.classList.remove("open");
                modal.classList.add("close");
                modal.addEventListener("transitionend", function () {
                    document.querySelector(".modal").remove();
                    modal.removeEventListener("transitionend", this);
                    console.log(this);
                });
            },
        };
    }
}

// Иниализируем навигацию
(function () {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < sliderSize; i++) {
        let point = document.createElement("div");
        point.classList.add("point");
        fragment.append(point);
    }
    document.querySelector(".navigation").append(fragment);
    let current = getCurrentIndex();
    navigation = document.querySelectorAll(".navigation .point");
    navigation[current].classList.add("current");
    auto.run();
})();

//Добавляем/удаляем классы для перемещения
function goNext(previous, following) {
    images[previous].classList.remove("current");
    navigation[previous].classList.remove("current");
    images[following].classList.add("current");
    navigation[following].classList.add("current");
}

// Возвращает индекс текущего элемента
function getCurrentIndex() {
    return Array.prototype.indexOf.call(
        images,
        corusel.querySelector(".current")
    );
}

//Запуск Autorun
function autorun(func) {
    let interval;
    let timeout;
    return {
        run() {
            this.stop();
            interval = setInterval(func, 3000);
        },
        stop() {
            clearInterval(interval);
            clearTimeout(timeout);
        },
        delay(ms) {
            this.stop();
            timeout = setTimeout(this.run, ms);
        },
    };
}
