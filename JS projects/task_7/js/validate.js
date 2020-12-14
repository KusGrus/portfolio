const name = document.querySelector("#name"); // Имя
const email = document.querySelector("#email"); // email
const phone = document.querySelector("#phone"); // Телефон
const address = document.querySelector("#address"); // Адресс
const city = document.querySelector("#city"); // Город
const state = document.querySelector("#state"); // Область/штат
const zip = document.querySelector("#zip"); // Zip
const order = document.querySelector(".order"); //Форма


//Пример кнопки
// button.addEventListener("click", function(event){
//     event.preventDefault();
//     if (!validateForm(order)) return;
//     //Дальнейшние дейтсвия
// });


// Блок формата ввода полей
phone.addEventListener("input", formatPhoneNumber);
zip.addEventListener("input", formatZip);
name.addEventListener("input", function(){
    this.value = this.value.replace(/[\d-\.\\\/\,><]/g, "");
});
city.addEventListener("input", function(){
    this.value = this.value.replace(/[\d-\.\\\/\,><]/g, "");
});
state.addEventListener("input", function(){
    this.value = this.value.replace(/[\d-\.\\\/\,><]/g, "");
});
email.addEventListener("focusout", function(event){
    let regexp = (/[\d\w-.]+@[\w\d-]+\.[\w]{2,8}/g);
    if (!this.value.match(regexp) && this.value){
        addErrorForm(this, "Invalid e-mail!");
    }
});

// Блок валидации полей
phone.addEventListener("focusout", validatePhoneNumber);
zip.addEventListener("focusout", validateZip);
order.addEventListener("focusout", validateRequired);
order.addEventListener("focusin", changeOnField);


// При клике на поле удаляем ошибку
function changeOnField(event) {
    let element = event.target;
    if (element.classList.contains("_error")) removeErrorForm(element);
}

// Ввод номера телефона
function formatPhoneNumber() {
    phone.value = phone.value.replace(/[^\d]/g, "");
    let currentLen = phone.value.length;
    if (currentLen > 1 && currentLen < 5) {
        phone.value = phone.value.replace(/(\d)(\d{1,3})/, "$1-($2");
    } else if (currentLen > 4 && currentLen < 8) {
        phone.value = phone.value.replace(/(\d)(\d{3})(\d{1,3})/, "$1-($2)-$3");
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

// Валидция на обязательные поля (конкретное поле)
function validateRequired(event) {
    let element = event.target;
    if (element.classList.contains("_req") && element.value.length === 0) {
        addErrorForm(element, "Required field!");
    }
}

// Валидация всех обязательных полей
function validateAllRequired(parent){
    let required = parent.querySelectorAll("._req");
    required.forEach(item=>{
        if (item.value.length <1){
            addErrorForm(item, "Required field!");
        }
    });  
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

// Проверяем готова ли форма к следующему действию
function validateForm(form){
    validateAllRequired(form);
    let errors = form.querySelectorAll("._error");
    if (errors.length !==0) return false;
    else return true;
}
