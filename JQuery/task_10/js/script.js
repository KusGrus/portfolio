$(document).ready(function () {
    const TASKLIST = ".todo__tasks";
    const TRASHLIST = ".trash__tasks";
    status();

    $(TASKLIST).droppable({
        tolerance: "intersect",
        accept: ".task",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            moveItem(TASKLIST, ui.draggable);
        },
    });

    $(TRASHLIST).droppable({
        tolerance: "intersect",
        accept: ".task",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            moveItem(this, ui.draggable);
        },
    });

    // При вводе новой задачи в заголовке нажимаем Enter и добавляем задачу
    $(".todo__header label").on("click", checkItem);

    // Для обработки новых элементов оттлакиваемся от DOM и селектора
    $(document).on("click", ".status, span", completeItem);

    $(document).on("click", ".delete", removeItem);
    
    $(document).on("click", ".clear", removeAllItem);

    $(document).on("click", "#destruct", function(){
        let [list, trash] = $(" .clear");
        removeAllItem.call(list);
        removeAllItem.call(trash);
        
    });

    // При вводе новой задачи в заголовке нажимаем Enter и добавляем задачу
    $(".todo__header").on("keydown", function (e) {
        if (e.which === 13) {
            let str = $(".todo__header input").val();
            if (str) {
                $(".todo__tasks").append(
                    `<div class="task"><div class="status"></div><span>${str}</span><div class="delete"></div></div>`
                );
                $(".todo__header input").val("");
            }
        }
        status();
    });

    // При нажатии на стрелку либо все выделяем, либо все сбрасываем
    function checkItem() {
        let tasks = $(TASKLIST).children();
        tasks = [...tasks];
        tasks.map((item) => console.log($(item)));
        if (tasks.every((item) => $(item).hasClass("complete"))) {
            tasks.map((item) => {
                $(item).removeClass("complete");
            });
        } else {
            tasks.map((item) => {
                $(item).addClass("complete");
            });
        }
    }

    // При нажатии на задачу выделяем как завершенная
    function completeItem() {
        $(this).closest(".task").toggleClass("complete");
        status();
    }

    // Удаление элемента
    function removeItem() {
        $(this)
            .closest(".task")
            .fadeOut(500, function () {
                $(this).closest(".task").remove();
                status();
            });
    }

    // Удаление всех элементов
    function removeAllItem() {
        console.log(this);
        let prevItem = $(this).parent().prev().children();
        prevItem.fadeOut(500, function () {
            prevItem.remove();
            status();
        });
    }

    // Перемещение задач
    function moveItem(target, item) {
        $(target).append($(item));
        if ($(target).hasClass("trash__tasks")) {
            $(item).addClass("removed");
        } else {
            $(item).removeClass("removed");
        }
        setTimeout(status, 0);
    }

    // отслеживание сосотояния списка задач
    function status() {
        // Проверяем список задач
        let countTask = $(TASKLIST).children().length;
        let countTrash = $(TRASHLIST).children().length;
        if (countTask > 0) {
            $(".todo .footer .statistic").text(`${countTask} items left`);
            $(".todo .footer").css("display", "flex");
        } else {
            $(".todo .footer").css("display", "none");
        }
        if (countTrash > 0) {
            $(".trash .footer .statistic").text(`${countTrash} items left`);
            $(".trash .footer").css("display", "flex");
        } else {
            $(".trash .footer").css("display", "none");
        }
        // Делаем все задачи "передвигаемыми"
        $(".task").draggable({
            cursor: "move",
            helper: "clone",
        });
    }
});
