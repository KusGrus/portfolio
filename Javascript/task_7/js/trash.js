// let form = document.querySelector(".order__body"); //Форма
// const navigationBar = document.querySelector(".order__step"); //Навигация
// const navigations = navigationBar.querySelectorAll(".step"); //Пункты навигации
// const next = document.querySelector(".next"); //Кнопка "Next"
// const moveBack = move.bind(null, -1); //Шаг вперед на 1
// const moveForawrd = move.bind(null, 1); //Шаг назад на 1
// let contents = form.querySelectorAll(".content"); //Общее число блоков (форм)
// let current = 0; //Число загруженных страниц
// let editURL = urlParams();


// // Общая стрктура (для расширения)
// const structure = ["index.html", "scalability.html", "order.html"];
// //Events
// next.addEventListener("click", goNext);

// // Общая функция для кнопок "Next"
// async function goNext(event) {
//     event.preventDefault();
//     let currentIndex = getCurrentIndex();
//     if (!validateForm(order)) return;
//     //Если текущая страница - последняя из загруженных и есть еще незагруженные старницы,
//     //то сверяемся со стркутурой и берем следуюущую старницу и грузим ее (для расширения)
//     if (currentIndex === current && current < Object.keys(structure).length) {
//         let params = editURL.add(currentIndex);
//         let html = await loadPage(structure[currentIndex + 1], params);
//         // // renew(html);
//         // // moveForawrd();
//         // current++;
//         //Если след страница загружена, то просто делаем ее видимой, а текущую скрываем
//     } else {
//         moveForawrd();
//     }
// }

// //Общая функция для кнопок "Back"
// function goBack(event) {
//     event.preventDefault();
//     moveBack();
// }

// //Функция для кнопки "Submit"
// function goSubmit(event) {
//     event.preventDefault();
//     let params = editURL.add(getCurrentIndex());
//     console.log(window.location.search);
//     form = document.querySelector(".order__body");
//     let inputs = form.querySelectorAll("input");
//     let object = {};
//     let boxes = new Set();
//     Array.prototype.forEach.call(inputs, (item) => {
//         if (item.type !== "checkbox") {
//             object[item.id] = item.value;
//         } else {
//             let parent = item.closest(".area");
//             let label = parent.querySelector("label");
//             boxes.add(label.id);
//         }
//     });
//     Array.from(boxes).forEach((label) => {
//         label = form.querySelector(`#${label}`);
//         let parent = label.closest(".area");
//         inputs = parent.querySelectorAll("input");
//         object[label.id] = [];
//         Array.prototype.forEach.call(inputs, (item) => {
//             if (item.checked) {
//                 parent = item.closest(".item");
//                 let value = parent.querySelector("label");
//                 object[label.id].push(value.textContent);
//             }
//         });
//     });
//     createPopup(object);
// }

// //Загружаем страницу
// async function loadPage(url, params) {
//     let urll = new URL('http://localhost:5500/order.html?message=hello&who=world')
    
//     url.search;
//     // let response = await fetch(url+params, {
//     //     mode: "no-cors",
//     //     method: "get",
//     // });
//     // console.log(url+params);
//     // let result = await response.text();
//     // console.log(response);
//     // return result;
// }

// //Добавляем HTML с подгруженной страницы в текущий HTML
// function renew(html) {
//     let div = document.createElement("div");
//     div.classList.add("content");
//     div.innerHTML = html;
//     let backButton = div.querySelector(".back");
//     let nextButton = div.querySelector(".next");
//     let submitButton = div.querySelector(".submit");

//     form.append(div);
//     //Создаем обработчики событий, если есть соотвуствующие кнопки
//     //.next, .back и .submit
//     if (!!backButton) backButton.addEventListener("click", goBack);
//     if (!!nextButton) nextButton.addEventListener("click", goNext);
//     if (!!submitButton) submitButton.addEventListener("click", goSubmit);
// }

// //Движение по формам (-1, 1)
// function move(step) {
//     let currentIndex = getCurrentIndex();
//     let nextIndex = (currentIndex + step) % navigations.length;
//     contents = form.querySelectorAll(".content");
//     navigations[currentIndex].classList.toggle("active");
//     navigations[nextIndex].classList.toggle("active");
//     contents[currentIndex].classList.add("hide");
//     contents[nextIndex].classList.remove("hide");
// }

// //Получаем текущий индекс
// function getCurrentIndex() {
//     let currentItem = navigationBar.querySelector(".active");
//     let currentIndex = Array.prototype.indexOf.call(navigations, currentItem);
//     return currentIndex;
// }

// //Создаем popup с результатами
// function createPopup(object) {
//     let popup = document.createElement("div");
//     popup.classList.add("popup");
//     popup.innerHTML = `<h1>Result</h1><div class="close"></div>`;
//     let fragment = new DocumentFragment();

//     for (let [key, value] of Object.entries(object)) {
//         let row = document.createElement("div");
//         row.classList.add("row");
//         row.innerHTML = `<div class="key">${key}</div><div class="value">${value}</div>`;
//         fragment.appendChild(row);
//     }
//     popup.append(fragment);
//     document.body.append(popup);
//     document.body.classList.add("lock");
//     let close = document.querySelector(".close");
//     close.addEventListener("click", closePopup);
// }

// //Закрываем результаты
// function closePopup(event) {
//     this.removeEventListener("click", closePopup);
//     let popup = event.target.closest(".popup");
//     popup.classList.add("delete");
//     document.body.classList.remove("lock");
//     document.addEventListener("transitionend", function () {
//         popup.remove();
//     });
// }

// //Форматируем параметры
// function formatParam(param) {
//     return param.replaceAll("-", "").replaceAll(")", "").replaceAll("(", "");
// }

// //Формируем для работы с параметрам
// function urlParams(){
//     let params = "?";
//     return {
//         add(index){
//             contents = form.querySelectorAll(".content");
//             let inputs = contents[index].querySelectorAll("input");
//             inputs.forEach(item => {
//                 if (item.value) {
//                     if (item.type !== "checkbox") {
//                         params+= (params.length === 1 ? "" : "&") + `${encodeURIComponent(item.id)}=${encodeURIComponent(formatParam(item.value))}`;
//                     }
//                     else if (item.checked) {
//                         let parent = item.closest(".item");
//                         let key = item.closest(".area").querySelector("label");
//                         console.log(key);
//                         let value = parent.querySelector("label");
//                         params+= (params.length === 1 ? "" : "&") + `${encodeURIComponent(key.id)}=${encodeURIComponent(formatParam(value.textContent))}`;
//                     }   
//                 }
//             });
//             return params;
//         }
//     }
// }

// //Быстрый тест
// (function fastTest() {
//     name.value = "Vlad";
//     address.value = "St. Pushkina, d. Kolotushkina";
//     state.value = "Nevada";
//     phone.value = "8-(800)-555-35-35";
//     zip.value = "123 456";
//     email.value = "example@mail.org";
//     city.value = "New York";
// })();

//====================================================================================================================

// const form = document.querySelector(".order__body"); //Форма
// const next = document.querySelector(".next"); //Кнопка "Next"
// const back = document.querySelector(".back"); //Кнопка "Next"
// const submit = document.querySelector(".submit"); //Кнопка "Next"
// const content = form.querySelector(".content"); //Общее число блоков (форм)
// const addParam = urlParams(); // Добавление параметров

// if (!!next) next.addEventListener("click", goNext.bind(null, "order.html"));

// if (!!back) back.addEventListener("click", goBack.bind(null, "index.html"));

// if (!!submit) submit.addEventListener("click", goSubmit);

// function goNext(url, event) {
//     event.preventDefault();
//     document.location.href = url + addParam();
// }

// function goBack(url, event) {
//     event.preventDefault();
//     document.location.href = url;
// }

// function goSubmit(event) {
//     event.preventDefault();
//     let object = parseQuery(window.location.search);
//     checkboxValues();
//     console.log(object);
// }

// //Формируем параметры
// function urlParams() {
//     let params;
//     return function (search) {
//         params = document.location.search.length === 0 ? "?": document.location.search;
//         let inputs = content.querySelectorAll("input");
//         let textarea = content.querySelectorAll("textarea");
//         let union = [...inputs, ...textarea];
//         let options = new Set(); // Храним темы checkbox
//         let checkboxes= {}
//         union.forEach((item) => {
//             if (item.value) {
//                 if (item.type !== "checkbox"){
//                     params +=(params.length === 1 ? "" : "&") +`${encodeURIComponent(item.id)}=${encodeURIComponent(item.value)}`;
//                 }
//                 else {
//                     let label = item.closest(".area").querySelector("label");
//                     options.add(label.id)
//                 }
//             }
//         });
//         Array.from(options).forEach(item=>checkboxes[item]=[]);
//         Array.from(options).forEach(item=>{
//             let section = content.querySelector(`#${item}`).closest(".area");
//             let checked = section.querySelectorAll("input:checked");
//             checked.forEach(input=>{
//                 let name = input.closest(".item").querySelector("label").textContent;
//                 checkboxes[item].push(name);
//             });
//         });
//         return params;
//     };
// }

// // Парсим query
// function parseQuery(query){
//     let obj = {}
//     let urlParams = new URLSearchParams(query);
//     for (let [key,value] of urlParams){
//         obj[key] = value;
//     }
//     return obj;
// }

// // ПОлучаекм данные из checkbox
// function checkboxValues(){
//     let options = new Set(); // Храним темы checkbox
//     let inputs = content.querySelectorAll(`input[type="checkbox"]`);
//     inputs.forEach((item) => {
//         let label = item.closest(".area").querySelector("label");
//         options.add(label.id)
//     });
// }