window.addEventListener("DOMContentLoaded", function domLoadedHandler(e) {
    const container = document.querySelector(".product-listing");
    const cartIcon = document.querySelector(".cart-icon");
    let cart = []; // Для дальнейшей реализации корзины
    for (let item of getAll()) {
        addChild(container, item);
    }
    let cartButtons = document.querySelectorAll(".btn-cart");
    let orderButtons = document.querySelectorAll(".btn-order");
    cartButtons.forEach((button) => button.addEventListener("click", addItem));
    orderButtons.forEach((button) =>
        button.addEventListener("click", orderPopup)
    );

    // Functions
    function addChild(parent, object) {
        let child = document.createElement("div");
        child.classList.add("product");
        child.setAttribute("data-id", object.id);
        child.innerHTML = `
        <div class="image">
            <img src="${object.img}" alt="item" />
        </div>
        <div class="description">
            <div class="title">${object.title}</div>
            <div class="price">${object.price.toLocaleString()} руб.</div>
        </div>
        <div class="actions">
            <button class="btn btn-order">Заказать</button>
            <button class="btn btn-cart">В корзину</button>
        </div>`;
        parent.appendChild(child);
    }

    function addItem(event) {
        let item = getByID(
            event.target.closest(".product").getAttribute("data-id")
        );
        let add = Number(cartIcon.getAttribute("data-count") || 0);
        cartIcon.setAttribute("data-count", add + 1);
        cartIcon.classList.remove("zero");
        cart.push(item);
        cartPopup(item);
    }

    function cartPopup(object) {
        let popup = document.querySelector(".cart-popup");
        if (popup) {
            popup.remove();
        }
        popup = document.createElement("div");
        popup.classList.add("cart-popup");
        popup.innerHTML = `
            <div class="information">Вы добавили в корзину:</div>
            <div class="popup-body">
                <span></span>
                <div class="image">
                    <img src="${object.img}" alt="prodcut">
                </div>
                <div class="description">
                    <div class="title">${object.title}</div>
                    <div class="price">${object.price.toLocaleString()} руб.</div>
                </div>
            </div>
            <div class="action">
                <button class="btn btn-order">Перейти в корзину</button>
            </div>`;
        document.body.appendChild(popup);
        let close = popup.querySelector("span");
        close.addEventListener("click", (e) => {
            deleteElement(popup, 0);
        });
        deleteElement(popup, 4000);
    }

    function orderPopup(event) {
        let object = getByID(
            event.target.closest(".product").getAttribute("data-id")
        );
        let popup = document.createElement("div");
        popup.classList.add("order-popup");
        popup.innerHTML = `
            <div class="backdrop"></div>
            <form class="popup-body">
                <span></span>
                <div class="title">${object.title}</div>
                <div class="description">
                    <div class="information">
                        <div class="image">
                            <img src="${object.img}" alt="product" />
                        </div>
                        <div class="price">${object.price.toLocaleString()} руб.</div>
                    </div>
                <div class="comments">
                    <label for="comment">Комментарий к заказу:</label>
                    <textarea id="comment"></textarea>
                </div>
                </div>
                <div class="contacts">
                    <label for="phone">Ваш телефон *:</label>
                    <input type="text" type="tel" id="phone" />
                </div>
                <div class="actions">
                    <button class="btn btn-send">Отправить</button>
                </div>
            </form>`;
        document.body.appendChild(popup);
        let close = popup.querySelector("span");
        close.addEventListener("click", (e) => {
            deleteElement(popup, 0);
        });
    }

    function deleteElement(element, timeout) {
        setTimeout(() => {
            element.classList.add("hide");
            document.addEventListener("transitionend", (e) => {
                element.remove();
            });
        }, timeout);
    }

    //API logic

    function getAll() {
        return API.products;
    }

    function getByID(id) {
        return API.products.find((item) => +item.id === +id);
    }
});