class Person {
    constructor(option, history = []) {
        this.name = option.name;
        this.surname = option.surname;
        this._discount = 5;
        this.history = history;
    }

    get fullname() {
        return `${this.name} ${this.surname}`;
    }

    get discount() {
        let bonus = history.length > 0 ? 1 : 0;
        return this._discount * bonus + "%";
    }

    buy(order) {
        this.history.push(order);
    }
}
