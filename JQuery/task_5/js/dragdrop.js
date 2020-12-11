$(document).ready(function () {
    let $gallery = $("#photo-grid");
    let $trash = $(".trash");
    let $poof = $(".poof img");
    let interval;

    function scroll() {
        let step = 0;
        return function () {
            if (step == 6) {
                clearInterval(interval);
            } else {
                step++;
                $($poof).css("display", "inline");
                $($poof).css("top", -127 * step);
            }
        };
    }

    $($gallery).sortable();

    $($trash).droppable({
        accept: "img",
        activeClass: "dropArea",
        hoverClass: "dropAreaHover",
        drop: function (event, ui) {
            let diff = $(".poof").height() / 2;
            $(".poof").offset({
                left: event.pageX - diff,
                top: event.pageY - diff,
            });
            interval = setInterval(scroll(), 100);
            ui.draggable.remove();
        },
    });
});
