$(document).ready(function () {

    // Валидация формы
    let $form = $("#send");

    $form.validate({
        rules: {
            username: {
                required: true,
            },
            useremail: {
                required: true,
                email: true,
            },
            usertext: {
                required: true,
                minlength: 20,
            },
        },
        messages: {
            username: {
                required: "Please fill in this field!",
            },
            useremail: {
                required: "Please fill in this field!",
                email: "The input format: example@mail.com",
            },
            usertext: {
                required: "Please fill in this field!",
                minlength: $.format(
                    "The description must contain at least {0} characters"
                ),
            },
        },
    });


    // Отправка формы
    $("#send").on("submit", function () {
        $.post("action.php", $("#send").serialize(), function (msg) {
                alert(`Данные отправлены на сервер:\n${msg}`);
            }
        );
        return false; // Чтобы страница не перезагружалась
    });

});
