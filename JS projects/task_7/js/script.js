const form = document.querySelector(".order__body"); //Форма
const next = document.querySelector(".next"); //Кнопка "Next"
const back = document.querySelector(".back"); //Кнопка "Next"
const submit = document.querySelector(".submit"); //Кнопка "Next"
const content = form.querySelector(".content"); //Общее число блоков (форм)
const addParam = urlParams(); // Добавление параметров

if (!!next) next.addEventListener("click", goNext.bind(null, "order.html"));

if (!!back) back.addEventListener("click", goBack.bind(null, "index.html"));

if (!!submit) submit.addEventListener("click", goSubmit);

function goNext(url, event) {
    event.preventDefault();
    document.location.href = url + addParam();
}

function goBack(url, event) {
    event.preventDefault();
    document.location.href = url;
}

function goSubmit(event) {
    event.preventDefault();
    let search = parseQuery(window.location.search);
    let current = getValueFromSecondForm();
    let object = Object.assign(search,current);
    createPopup(object);
}

//Формируем параметры
function urlParams() {
    let params;
    return function (search) {
        params = document.location.search.length === 0? "?": document.location.search;
        let inputs = content.querySelectorAll("input");
        let textarea = content.querySelectorAll("textarea");
        let union = [...inputs, ...textarea];
        union.forEach((item) => {
            if (item.value) {
                if (item.type !== "checkbox") {
                    params +=(params.length === 1 ? "" : "&") +`${encodeURIComponent(item.id)}=${encodeURIComponent(item.value)}`;
                }
            }
        });
        return params;
    };
}

// Парсим query
function parseQuery(query) {
    let obj = {};
    let urlParams = new URLSearchParams(query);
    for (let [key, value] of urlParams) {
        obj[key] = value;
    }
    return obj;
}

// Получаекм данные из checkbox
function getValueFromSecondForm() {
    let options = new Set(); // Храним темы checkbox
    let result = {};
    let inputs = content.querySelectorAll(`input[type="checkbox"]`);
    let textarea = content.querySelector("textarea");

    inputs.forEach((item) => {
        let label = item.closest(".area").querySelector("label");
        options.add(label.id);
    });
    Array.from(options).forEach((item) => (result[item] = []));
    Array.from(options).forEach((item) => {
        let section = content.querySelector(`#${item}`).closest(".area");
        let checked = section.querySelectorAll("input:checked");
        checked.forEach((input) => {
            let name = input.closest(".item").querySelector("label")
                .textContent;
                result[item].push(name);
        });
    });
    result[textarea.id] = textarea.value;
    return result;
}

//Создаем popup с результатами
function createPopup(object) {
    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<h1>Result</h1><div class="close"></div>`;
    let fragment = new DocumentFragment();

    for (let [key, value] of Object.entries(object)) {
        let row = document.createElement("div");
        row.classList.add("row");
        row.innerHTML = `<div class="key">${key}</div><div class="value">${value}</div>`;
        fragment.appendChild(row);
    }
    popup.append(fragment);
    document.body.append(popup);
    document.body.classList.add("lock");
    let close = document.querySelector(".close");
    close.addEventListener("click", closePopup);
}

//Закрываем результаты
function closePopup(event) {
    this.removeEventListener("click", closePopup);
    let popup = event.target.closest(".popup");
    popup.classList.add("delete");
    document.body.classList.remove("lock");
    document.addEventListener("transitionend", function () {
        popup.remove();
    });
}