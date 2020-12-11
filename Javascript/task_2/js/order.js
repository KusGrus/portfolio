document.addEventListener("DOMContentLoaded", function () {
    const REGION = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ]; // Регионы
    const CARD = ["MasterCard", "Visa", "Mir"]; // Типы карт
    let MONTHS = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    }; // Масяцы
    const order = document.querySelector(".order"); // Форма
    const phone = document.querySelector("#phone"); // Телефон
    const cardNumber = document.querySelector("#cardnumber"); // Номер карты
    const cardExpiration = document.querySelector("#expiration"); // Срок действия карты
    const cvv = document.querySelector("#cvv"); // CVV карты
    const zip = document.querySelector("#zip"); // Почтовый индекс
    const same = document.querySelector("#same"); // Checkbox для того же адреса
    const deliveryAddress = document.querySelector("#delivery"); // Адрес доставки
    const address = document.querySelector("#address"); // Адрес
    const regions = document.querySelector("#region"); // Регион
    const card = document.querySelector("#type"); // Тип карты
    const deliveryDate = document.querySelector(".deliverydate"); // Дата доставки
    const account = document.querySelector(".account"); // Создание аккаунта
    const submit = document.querySelector(".order__button"); // Кнопка формы

    let orderList; // Храним данные заказа

    // Класс для работы с пользователем
    class User {
        constructor(options) {
            this.firstname = options.firstname;
            this.lastname = options.lastname;
            this.username = options.username;
            this.password = options.passwd;
            this.order = {
                model: options.model,
                comment: options.comment,
                address: options.address,
                region: options.region,
                zip: options.zip,
                phone: options.phone,
                deliveryAddress: options.deliveryAddress,
                deliveryDate: options.deliveryDate,
                cardType: options.cardType,
                cardNumber: options.cardNumber,
                cardExpiration: options.cardExpiration,
                cardCVV: options.firstname,
            };
        }
    }

    order.addEventListener("focusout", validateRequired);
    order.addEventListener("focusin", clickOnField);

    // Блок формата ввода полей
    phone.addEventListener("input", formatPhoneNumber);
    cardNumber.addEventListener("input", formatCardNumber);
    cardExpiration.addEventListener("input", formatCardExpiration);
    cvv.addEventListener("input", formatCardCVV);
    zip.addEventListener("input", formatZip);

    // Блок валидации полей
    phone.addEventListener("focusout", validatePhoneNumber);
    cardNumber.addEventListener("focusout", validateCardNumber);
    cardExpiration.addEventListener("focusout", validateCardExpiration);
    cvv.addEventListener("focusout", validateCardCVV);
    zip.addEventListener("focusout", validateZip);
    deliveryDate.addEventListener("change", validateDeliveryDate);
    account.addEventListener("focusout", validateAccount);

    // Работа с доп. элементами
    same.addEventListener("change", checkSameAddress);
    deliveryDate.addEventListener("change", setDate);
    submit.addEventListener("click", sendForm);

    // При клике на поле удаляем ошибку
    function clickOnField(event) {
        let element = event.target;
        if (element.classList.contains("_error")) removeErrorForm(element);
    }

    // Ввод номера карты
    function formatCardNumber() {
        cardNumber.value = cardNumber.value.replace(/[^\d]/g, "");
        let currentLen = cardNumber.value.length;

        if (currentLen > 4 && currentLen < 9) {
            cardNumber.value = cardNumber.value.replace(
                /(\d{4})(\d{1,4})/,
                "$1 $2"
            );
        } else if (currentLen > 8 && currentLen < 13) {
            cardNumber.value = cardNumber.value.replace(
                /(\d{4})(\d{4})(\d{1,4})/,
                "$1 $2 $3"
            );
        } else if (currentLen > 12) {
            cardNumber.value = cardNumber.value.replace(
                /(\d{4})(\d{4})(\d{4})(\d{1,4})/,
                "$1 $2 $3 $4"
            );
        }
    }

    // Ввод номера телефона
    function formatPhoneNumber() {
        phone.value = phone.value.replace(/[^\d]/g, "");
        let currentLen = phone.value.length;
        if (currentLen > 1 && currentLen < 5) {
            phone.value = phone.value.replace(/(\d)(\d{1,3})/, "$1-($2");
        } else if (currentLen > 4 && currentLen < 8) {
            phone.value = phone.value.replace(
                /(\d)(\d{3})(\d{1,3})/,
                "$1-($2)-$3"
            );
        } else if (currentLen > 7 && currentLen < 10) {
            phone.value = phone.value.replace(
                /(\d)(\d{3})(\d{3})(\d{1,2})/,
                "$1-($2)-$3-$4"
            );
        } else if (currentLen > 9) {
            phone.value = phone.value.replace(
                /(\d)(\d{3})(\d{3})(\d{2})(\d{1,2})/,
                "$1-($2)-$3-$4-$5"
            );
        }
    }

    // Ввод даты для карты
    function formatCardExpiration() {
        cardExpiration.value = cardExpiration.value.replace(/[^\d\/]/g, "");
        let currentLen = cardExpiration.value.length;
        if (currentLen > 2) {
            cardExpiration.value = cardExpiration.value.replace(
                /(\d{2})(\d{1,2})/,
                "$1/$2"
            );
        }
    }

    // Ввод CVV
    function formatCardCVV() {
        cvv.value = cvv.value.replace(/[^\d]/g, "");
    }

    // Ввод Zip
    function formatZip() {
        zip.value = zip.value.replace(/[^\d]/g, "");
        if (zip.value.length > 3) {
            zip.value = zip.value.replace(/(\d{3})(\d{1,3})/, "$1 $2");
        }
    }

    // Валидция номера телефона
    function validatePhoneNumber() {
        let number = phone.value;
        if (number) {
            let valid = number.match(/\d-\(\d{3}\)-\d{3}-\d{2}-\d{2}/);
            if (!valid) {
                addErrorForm(phone, "Invalid phone number!");
            }
        }
    }

    // Валидция номера карты
    function validateCardNumber() {
        let number = cardNumber.value;
        if (number) {
            let valid = number.match(/(\d{4}) (\d{4}) (\d{4}) (\d{4})/);
            if (!valid) {
                addErrorForm(cardNumber, "Invalid card number!");
            }
        }
    }

    // Валидция CVV код карты
    function validateCardCVV() {
        if (cvv.value) {
            cvv.value.length !== 3
                ? addErrorForm(cvv, "Invalid CVV code!")
                : false;
        }
    }

    // Валидция срока действия карты
    function validateCardExpiration() {
        let currentDate = new Date();
        let [month, year] = cardExpiration.value.split("/");
        year = (currentDate.getFullYear() + "").slice(0, 2) + year;
        let cardDate = new Date(+year, +month - 1, 1);

        let cardYear = +(currentDate.getFullYear() + "").slice(2);

        if (cardExpiration.value) {
            if (+month > 12 || +month < 1) {
                addErrorForm(cardExpiration, "Invalid date (month)!");
                return;
            } else if (
                +year.slice(2) < cardYear ||
                +year.slice(2) > cardYear + 6
            ) {
                addErrorForm(cardExpiration, "Invalid date (year)!");
                return;
            }
        }
        if (cardDate - currentDate < 1) {
            addErrorForm(cardExpiration, "Invalid date!");
            return;
        }
    }

    // Валидция Zip
    function validateZip() {
        let number = zip.value;
        if (number) {
            let valid = number.match(/(\d{3}) (\d{3})/);
            if (!valid) {
                addErrorForm(zip, "Invalid ZIP!");
            }
        }
    }

    // Валидция даты доставки
    function validateDeliveryDate() {
        let currentDate = new Date();
        let [day, month, year] = dateFormat().split("/");
        let date = new Date(+year, +month - 1, +day);
        if (date - currentDate <= 86400000) {
            addErrorForm(deliveryDate, "Incorrect delivery date!");
            return;
        }
        removeErrorForm(deliveryDate);
    }

    // Валидция аккаунта
    function validateAccount() {
        let password = account.querySelector("#password");
        let confirm = account.querySelector("#confirm-password");

        removeErrorForm(password);
        removeErrorForm(confirm);

        if (
            password.value !== confirm.value &&
            confirm.value &&
            password.value
        ) {
            addErrorForm(password, "Passwords match!");
            addErrorForm(confirm, "");
        }
    }

    // Валидция формы
    function validateForm() {
        let errorMessage = Array.from(
            order.querySelectorAll("span")
        ).filter((item) => item.classList.contains("_error_message"));
        let required = order.querySelectorAll("._req");
        for (let obj of required) {
            if (!obj.value) {
                addErrorForm(obj, "Required field!");
            }
        }

        result = Array.from(order.querySelectorAll("._req")).filter((item) =>
            item.classList.contains("_error")
        );
        if (result.length === 0 && errorMessage.length === 0) {
            return true;
        }
        return false;
    }

    // Валидция на обязательные поля
    function validateRequired(event) {
        let element = event.target;
        if (element.classList.contains("_req") && element.value.length === 0) {
            addErrorForm(element, "Required field!");
        }
    }

    // Подсвечиваем некорректные поля
    function addErrorForm(element, message) {
        let errorMessage = document.createElement("span");
        let parent = element.closest(".field");

        errorMessage.classList.add("_error_message");
        errorMessage.textContent = message;

        if (!parent.querySelector("span")) {
            parent.append(errorMessage);
        }
        element.classList.add("_error");
    }

    // Удаляем подстветку полей
    function removeErrorForm(element) {
        //Провеяем есть ли сообщение об ошибке
        let parent = element.closest(".field");
        element.classList.remove("_error");
        let err = parent.querySelector("span");
        if (err) {
            err.remove();
        }
    }

    // Добавление такого же адреса
    function checkSameAddress() {
        if (this.checked) {
            deliveryAddress.value = address.value;
            deliveryAddress.disabled = true;
        } else {
            deliveryAddress.value = "";
            deliveryAddress.disabled = false;
            removeErrorForm(deliveryAddress);
        }
    }

    // Динамическая загрузка регионов
    (function addRegions() {
        for (let item of REGION) {
            let option = document.createElement("option");
            option.style.fontFamily = "Cairo";
            option.textContent = item;

            regions.add(option);
        }
    })();

    // Динамическая типов карт
    (function addCard() {
        for (let item of CARD) {
            let option = document.createElement("option");
            option.textContent = item;
            card.add(option);
        }
    })();

    //Динамическая подгрузка даты доставки
    (function addDeliviryDate() {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();

        // Подгружаем года
        for (let i = 0; i <= 5; i++) {
            let option = document.createElement("option");
            option.textContent = +year + i;
            document.querySelector("#year").add(option);
        }

        // Подгружаем месяцы
        for (let key in MONTHS) {
            let option = document.createElement("option");
            option.textContent = MONTHS[key];
            if (month == key) {
                option.selected = true;
            }
            document.querySelector("#month").add(option);
        }

        // Подгружаем дни
        days = generateDays(year, month);
        for (let i = 1; i <= days; i++) {
            let option = document.createElement("option");
            option.textContent = i;
            if (day == i - 2) {
                option.selected = true;
            }
            document.querySelector("#day").add(option);
        }
    })();

    // Узнаем максимальное количество дней в месяце
    function generateDays(year, month) {
        let start = new Date(year, month, 1);
        let finish = new Date(year, month + 1, 1);
        let diff = Math.round((finish - start) / 1000 / 3600 / 24);
        return diff;
    }

    // Устанавливаем правильную дату
    function setDate(event) {
        let month = document.querySelector("#month").value;
        for (let [key, value] of Object.entries(MONTHS)) {
            if (value === month) {
                month = key;
            }
        }
        let year = document.querySelector("#year").value;
        let day = document.querySelector("#day").value;

        if (event.target.id !== "day") {
            while (document.querySelector("#day").firstChild) {
                document
                    .querySelector("#day")
                    .removeChild(document.querySelector("#day").firstChild);
            }
            let days = generateDays(+year, +month);
            for (let i = 1; i <= days; i++) {
                let option = document.createElement("option");
                option.textContent = i;
                document.querySelector("#day").add(option);
            }
        }
    }

    // Вывод даты в формате ДД/ММ/ГГГГ
    function dateFormat() {
        let month = document.querySelector("#month").value;
        for (let [key, value] of Object.entries(MONTHS)) {
            if (value === month) {
                month = key;
            }
        }
        let year = document.querySelector("#year").value;
        let day = document.querySelector("#day").value;
        day = day < 10 ? "0" + day : day;
        month = +month + 1 < 10 ? "0" + (+month + 1) : +month + 1;

        result = `${day}/${month}/${year}`;
        result = `${day}/${month}/${year}`;
        return result;
    }

    // Отправка формы
    function sendForm(event) {
        event.preventDefault();
        valid = validateForm();

        if (!valid) return;

        let options = {
            model: order.querySelector("#model").value,
            comment: order.querySelector("#comment").value,
            firstname: order.querySelector("#clientname").value,
            lastname: order.querySelector("#clientsurname").value,
            address: address.value,
            region: regions.value,
            zip: zip.value,
            phone: phone.value,
            deliveryAddress: deliveryAddress.value,
            deliveryDate: dateFormat(),
            cardType: order.querySelector("#type").value,
            cardNumber: cardNumber.value,
            cardExpiration: cardExpiration.value,
            cardCVV: cvv.value,
            username: order.querySelector("#username").value,
            passwd: order.querySelector("#password").value,
        };

        let user = new User(options);
        content = document.querySelector(".content__body");
        let http = new XMLHttpRequest();
        http.open("GET", "result.html");

        http.onload = function () {
            if (http.readyState == 4) {
                orderList = content;
                console.log(orderList);
                content.innerHTML = http.responseText;
                content = document.querySelector(".content__body");
                content.querySelector(".clientname").textContent =
                    user.firstname;
                content.querySelector(".clientsurname").textContent =
                    user.lastname;
                for (let key in user.order) {
                    let element = content.querySelector(`.${key.toLowerCase()}`);
                    if (element) {
                        element.textContent = user.order[key];
                        if (key === "cardNumber") {
                            element.textContent = `${user.order.cardType}  ${user.order[key]}`;
                        }
                    }
                }
            }
        };
        http.send(null);
    }

    // Для быстрого теста
    (function testTask() {
        order.querySelector("#model").value = "T6000";
        order.querySelector("#comment").value = "No comment";
        order.querySelector("#clientname").value = "Ivan";
        order.querySelector("#clientsurname").value = "Ivanov";
        address.value = "St. Pushkina, d. Kolotushkina";
        regions.value = "Nevada";
        phone.value = "8-(800)-555-35-35";
        zip.value = "123 456";
        deliveryAddress.value = "St. Pushkina, d. Kolotushkina";
        order.querySelector("#type").value = "Visa";
        cardNumber.value = "6666 6666 6666 6666";
        cardExpiration.value = "12/23";
        cvv.value = "123";
        order.querySelector("#username").value = "User";
        order.querySelector("#password").value = "123";
        order.querySelector("#confirm-password").value = "123";
    })();
});
