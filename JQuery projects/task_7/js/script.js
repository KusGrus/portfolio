$(document).ready(function () {
    $("#photos").fadeOut();
    let session = flickr("190500755@N03");

    function flickr(userID){
        let url = `https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?`;
        return function(){
            $.getJSON(url, { format: "json", id: userID }, function (data) {
                $.each(data.items, function (index, item) {
                    $("#photos").append($("<img>").attr("src", item.media.m));
                });
            });
        }
    }

    $("#add").on("click", function () {
        session();
        $("#photos").fadeIn(1000);
    });

    $("#remove").on("click", function () {
        $("#photos").fadeOut(500, function () {
            $(this).empty();
        });
    });
});
