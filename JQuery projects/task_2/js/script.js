$(document).ready(function () {
    // set the Datepicker to open on focus (default behavior), on icon click, or both
    $("#datepicker, #toDatepicker").datepicker({
        showAnim: "slideDown",
        dateFormat: "dd/mm/yy",
        showOn: "both",
        buttonImage:
            "https://icon-icons.com/icons2/2568/PNG/32/expand_icon_153733.png",
        buttonImageOnly: true,
        buttonText: "Select date",

        // implement displaying a button for selecting Today’s date and a Done button for closing the calendar
        showButtonPanel: true,

        // implement showing month and year dropdowns in place of the static month/year header
        changeMonth: true,
        changeYear: true,

        // implement showing multiple months in a single Datepicker
        numberOfMonths: [1, 2],
    });

    // implement selecting the date range
    $("#datepicker")
        .datepicker()
        .on("change", function () {
            $("#toDatepicker").datepicker("option", "minDate", getDate(this));
        });
    $("#toDatepicker")
        .datepicker()
        .on("change", function () {
            $("#datepicker").datepicker("option", "maxDate", getDate(this));
        });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate("dd/mm/yy", element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
});
