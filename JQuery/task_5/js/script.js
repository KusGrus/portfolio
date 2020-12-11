$(document).ready(function () {
    $(".rainbow").sortable();

    // $(".rainbow__row").draggable({
    //     axis: "y",
    //     cursor: "grabbing",
    //     containment: "parent",
    //     snap: true,
    // });

    $(".rainbow__row").on("mousedown", function () {
        $(this).toggleClass("active");
    });

    $(".rainbow__row").on("mouseup", function () {
        $(this).toggleClass("active");
    });
});
