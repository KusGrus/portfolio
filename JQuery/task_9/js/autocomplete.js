$(document).ready(function () {
    let bikeTypes = [
        "Raleigh",
        "Focus",
        "Felt",
        "Specialized",
        "Trek",
        "Pinarello",
        "Eddy Merckx",
        "BMC",
        "Giant",
        "GT",
        "Salsa",
        "Cannondale",
        "Cervelo",
        "Bianchi",
        "Jamis",
        "Surly",
        "Diamondback",
        'Kona',
        'Fuji',
        'Santa Cruz',
        'Scott',
        'Yeti',
        'Soma',
        'Marin',
    ];
    $("#search").autocomplete({
        source: bikeTypes,
        autoFocus: true,
        minLength: 1,
    });
});
