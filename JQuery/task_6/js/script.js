$(document).ready(function () {
    let $homepage = $(".content").html(); // Запоминаем начальный контент
    $("nav button").on("click", function () {
        let $target = $(this).text().toLowerCase() + ".html"; // Генерируем название файла
        $.ajax({ url: $target }).done(function (html) {
            $target.replace(".html", "") == "home"
                ? $(".content").empty().append($homepage)
                : $(".content").empty().append(html);
        });
    });
});
