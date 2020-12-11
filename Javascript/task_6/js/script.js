const account = document.querySelector(".account form");
const username = account.querySelector("#username");
const email = account.querySelector("#email");
const password = account.querySelector("#password");
const confirm = account.querySelector("#password-confirm");
const propeties = account.querySelectorAll(".properties input");
const submit = account.querySelector("button");
const profilies = document.querySelector(".storage");
let storage = new Map();
let timer;

//Events
submit.addEventListener("click", createAccount);

//Создаем аккаунт
function createAccount(event) {
    event.preventDefault();
    if (account.querySelectorAll("._error").length !==0) return;
    if (isEmpty()) return;
    let instance = getValue();
    createProfile(instance)
}

//Получаем данные из формы
function getValue(){
    let object = {};
    object.name = username.value;
    object.email = email.value;
    object.password = password.value;
    object.confirm = confirm.value;
    object.property = Array.prototype.filter.call(propeties, item=> item.checked ? item: false);
    return object;
}

//Создаем объект
function createProfile(object){
    if (!storage.get(object.email)){
        let profile = document.createElement("div");
        profile.classList.add("profile");
        profile.innerHTML = `
            <h1>Title</h1>
            <div class="close"></div>
            <div class="profile__item">
                <h2>Username</h2>
                <span>${object.name}</span>
            </div>
            <div class="profile__item">
                <h2>Email address</h2>
                <span id="mail">${object.email}</span>
            </div>
            <div class="profile__item">
                <h2>Preferred Lodgings</h2>
                <ul></ul>
            </div>
        `;
        let list = profile.querySelector("ul");
        object.property.forEach((item)=>{
            let row = document.createElement("li");
            row.textContent = item.nextElementSibling.textContent;
            list.append(row);
        })
        if (!list.querySelector("li")) list.append("None");
        profilies.append(profile);
        storage.set(object.email, object);
        console.log(`Добавили новую бронь на email: ${object.email}:`);
        console.log(storage);
        let close = profile.querySelector(".close");
        close.addEventListener("click", closeProfile);
    }
    else {
        alert("Такая бронь уже существует!");
    }
}

//Удаляем бронь
function closeProfile(event){
    this.removeEventListener("click", closeProfile);
    let profile = event.target.closest(".profile");
    let email = profile.querySelector("#mail").textContent;
    profile.classList.add("delete");
    profilies.addEventListener("transitionend", function(){
        storage.delete(email);
        profile.remove();
        console.log(`Удалили бронь на email: ${email}:`);
        console.log(storage);
    })
}


// ============================= VALIDATION ============================= //
document.addEventListener("focusin", function(event){
    removeError(event.target);
})
username.addEventListener("input", function(){
    this.value = this.value.replace(/[\d-\.\\\/\,><]/g, "");
});
email.addEventListener("focusout", function(event){
    let regexp = (/[\d\w-.]+@[\w\d-]+\.[\w]{2,8}/g);
    if (!this.value.match(regexp) && this.value){
        addError(this)
    }
});
password.addEventListener("focusout", function(){
    clearTimeout(timer);
    timer = setTimeout(checkPasswd, 500);
});
confirm.addEventListener("focusout", function(){
    clearTimeout(timer);
    timer = setTimeout(checkPasswd, 500);
});

//Манипуляции с ошибками
function addError(obj){
    obj.classList.add("_error");
}
function removeError(obj){
    obj.classList.remove("_error");
}
//Проверям совпадают ли пароли
function checkPasswd(){
    if (password.value !== confirm.value){
        addError(password);
        addError(confirm);
    }
    else {
        removeError(password);
        removeError(confirm);
    }
}
function isEmpty(){
    let result = false;
    let fields = account.querySelectorAll(".req input");
    for (let field of fields){
        if (!field.value) {
            addError(field);
            result = true;
        }
    }
    return result;
}