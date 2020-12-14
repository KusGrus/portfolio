document.addEventListener("DOMContentLoaded", function () {
    let popup = document.querySelector(".popup");
    let registration = document.querySelector("#registration");
    let form = document.querySelector(".popup form");
    let menu = document.querySelector(".header__burger");
    let emailForm = document.querySelector("#email");
    let secret = document.querySelector("#pswd");
    let confirm = document.querySelector("#confirm");
    const guid = generator();
    let timer;

    // Закрытие окна регистрации
    popup.addEventListener("click", function (event) {
        if (event.target.closest(".popup__close")) {
            document.body.classList.remove("lock");
            popup.classList.remove("show");
            popup.classList.add("hide");
        }
    });

    // Откртие окна регистрации
    registration.addEventListener("click", function (event) {
        let inputs = popup.querySelectorAll("input");
        document.body.classList.add("lock");
        popup.classList.remove("hide");
        popup.classList.add("show");

        for (let input of inputs) {
            input.value = "";
            removeErrorForm(input);
        }
    });

    form.addEventListener("submit", sendForm);

    // Обработка нажатия кнопки
    async function sendForm(event) {
        event.preventDefault();

        let error = validateForm(this);

        if (error) return;

        name = form.querySelector("#name").value;
        mail = form.querySelector("#email").value;
        password = form.querySelector("#pswd").value;

        // Создаем инстанс User и добавляем в LocalStorage при отсутствии
        const user = signUP(name, mail, password);

        if (!user) return;

        // Эмулируем передачу данных на сервер
        console.log("Отправляем данные на сервер...");
        await delay(3000);
        let response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
        );
        let data = await response.json();
        console.log("Данные с сервера получены, отправляемв sessionStorage...");
        loadToSS(data);
    }

    // Создаем пользователя если его еще нету в LocalStorage
    function signUP(name, mail, password) {
        if (localStorage.getItem(mail)) {
            alert("Пользователь уже зарегестрирован!");
            return;
        }
        return new User({ name, mail, password });
    }

    // Класс пользователя
    function User(options) {
        this.name = options.name;
        this.email = options.mail;
        this.password = options.password;
        this.guid = guid();
        this.storage();
    }

    // Добавляем пользователя в LocalStorage
    User.prototype.storage = function () {
        localStorage.setItem(this.email, JSON.stringify(this));
        return;
    };

    // Генерация GUID пользователя
    function generator() {
        let start = Math.round(Math.random() * 10e8);
        return function () {
            return start++;
        };
    }

    // Добавляем объект в sessionStorage
    function loadToSS(obj) {
        for (let [key, value] of Object.entries(obj)) {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }

    // Эмуляция ответа сервера
    function delay(ms) {
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
    }

    // Скрывающееся меню
    menu.addEventListener("click", function (event) {
        this.classList.toggle("close");
        console.log(event.target);
        document.querySelector(".header__menu").classList.toggle("active");
        document.body.classList.toggle("lock");
    });

    // ========================= ВАЛИДАЦИЯ ============================== //

    // Валидация паролей (основной)
    secret.addEventListener("input", validatePasswd);

    // Валидация паролей (подтверждение)
    confirm.addEventListener("input", validatePasswd);

    // Владиация email на лету
    emailForm.addEventListener("keyup", function () {
        removeErrorForm(this);
        clearTimeout(timer);

        let valid = emailReg(this.value);

        if (valid === -1) {
            timer = setTimeout(() => addErrorForm(this), 1500);
        }
    });

    // Убираем ошибку, если начинается ввод
    form.addEventListener("input", function (event) {
        removeErrorForm(event.target);
    });

    // Валидация поля email
    function emailReg(item) {
        if (!item) return;
        let regexp = /[\d\w-]+@[\d\w-]+\.\w{2,8}/;
        return item.search(regexp);
    }

    // Проврека полей формы
    function validateForm(form) {
        let required = form.querySelectorAll("._req");
        for (let obj of required) {
            removeErrorForm(obj);
            if (!obj.value) {
                addErrorForm(obj);
            }
        }
        for (let obj of required){
            if (obj.classList.contains("_error")){
                return true
            }
        }    
        return false;
    }

    // Валидация пароля "на лету"
    function validatePasswd() {
        clearTimeout(timer);
        let first = form.querySelector("#pswd");
        let second = form.querySelector("#confirm");

        removeErrorForm(first);
        removeErrorForm(second);

        if (comparePswd(first, second)) {
            removeErrorForm(first);
            removeErrorForm(second);
        } else {
            timer = setTimeout(() => {
                addErrorForm(first);
                addErrorForm(second);
            }, 1000);
        }
    }

    // Проврека полей пароля
    function comparePswd(password, confirm) {
        return password.value === confirm.value;
    }

    // Подсвечиваем некорректные поля
    function addErrorForm(element) {
        element.classList.add("_error");
    }

    // Удаляем подстветку полей
    function removeErrorForm(element) {
        element.classList.remove("_error");
    }
});