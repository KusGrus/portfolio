$(document).ready(function () {
    let locations = [
        "Москва",
        "Мурманск",
        "Нальчик",
        "Нижневартовск",
        "Новокузнецк",
        "Новосибирск",
        "Омск ",
        "Оренбург",
        "Орск",
        "Остафьево",
        "Пенза",
        "Псков",
        "Сабетта",
        "Саранск",
        "Симферополь",
        "Сургут",
        "Сыктывкар",
        "Тамбов ",
        "Ульяновск",
        "Чебоксары",
        "Элиста",
        "Якутск",
    ];

    $("#date").datepicker();
    $("#find").autocomplete({ source: locations });
    $(".order__count input").checkboxradio({ icon: false });
    $(".order__meal select").selectmenu();
    $(".order__type input").checkboxradio({ icon: false });
    $("#button").button({
        icons: {
			secondary: "ui-icon-circle-arrow-e"
		}
    });
});
