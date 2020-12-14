$(document).ready(function () {
    $("#push").on("click", function () {
        $("#dialog").dialog({
            width: 400,
            show: {
                effect: "fade",
                duration: 1000,
            },
            hide: {
                effect: "fade",
                duration: 500,
            },
            position: {
                at: "center top",
            },
            buttons: [
                {
                    text: "Yes",
                    click: function () {
                        $(this).dialog("close");
                    },
                },
                {
                    text: "No",
                    click: function () {
                        $(this).dialog("close");
                    },
                },
            ],
        });
    });
});
