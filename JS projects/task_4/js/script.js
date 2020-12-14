// Fields
const form = document.querySelector(".payment");
const name = form.querySelector("#name");
const surname = form.querySelector("#surname");
const date = form.querySelector("#date");
const type = form.querySelector("#type");
const users = new Map();
let user;

//Buttons
const submit = form.querySelector(".payment__submit button");
const statistic = form.querySelector(".statistic button");

//Events
submit.addEventListener("click", function (event) {
    event.preventDefault();

    let options = getProperty();

    if (!options) {
        alert("Заполните все поля!");
        return;
    }
    user = loadUser(options);
    buy(user);
});
statistic.addEventListener("click", showInfo);
//Functions

//Get name and surname from fields
function getProperty() {
    let option = {};
    option.name = name.value;
    option.surname = surname.value;
    if (!option.name || !option.surname) {
        return false;
    }
    return option;
}

//Load/create user
function loadUser(property) {
    let userid = `${property.name} ${property.surname}`;
    if (users.get(userid)) {
        return new Person(property, users.get(userid));
    } else {
        return new Person(property);
    }
}

//Buy
function buy(instance) {
    let order = {};
    order.date = dateFormat(date.value);
    order.type = type.value.toLowerCase();
    if (order.date == false) return;
    instance.buy(order);
    users.set(instance.fullname, instance.history);
}

//Date format
function dateFormat(date) {
    let [year, month, day] = date.split("-");
    date = new Date(year, month, day);
    if (String(date) !== "Invalid Date") {
        year = date.getFullYear();
        month = date.toLocaleString("en", { month: "short" });
        day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return `${day}/${month}/${year}`;
    } else {
        alert("Invalid Date!");
        return false;
    }
}

//Database info
function showInfo(event) {
    event.preventDefault();
    console.clear();
    console.log(users);
    if (!user) {
        console.log("Data Base is empty!");
    } else {
        console.log(`Current user: ${user.fullname}`);
        console.log("All users for this session:");
        for (let key of users.keys()) {
            let [name, surname] = key.split(" ");
            let tempuser = loadUser({ name: name, surname: surname });
            console.log(`User: ${tempuser.name} (current discount = ${tempuser.discount}):`);
            for (let [index, order] of tempuser.history.entries()){
                console.log(`Order ${index}: Date: ${order.date}; Type: ${order.type}`);
            }
            console.log("=============================================================================");
        }
    }
}

//Validate-Format
name.addEventListener("input", formatName);
surname.addEventListener("input", formatSurname);

//Validate functions
function formatName() {
    name.value = name.value.replace(/[\d-\.\\\/]/g, "");
}

function formatSurname() {
    surname.value = surname.value.replace(/[\d-\.\\\/]/g, "");
}
