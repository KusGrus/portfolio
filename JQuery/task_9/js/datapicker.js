$(document).ready(function () {
    $("#datepicker, #toDatepicker").datepicker({
        showAnim: "slideDown",
        dateFormat: "dd/mm/yy",
        showOn: "both",
        buttonImage:"../img/icons/datapick.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        showButtonPanel: true,
    });

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
