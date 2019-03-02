$(() => {
    const aboutBtn = $("#aboutBtn");
    const book = $(".book");

    aboutBtn.click(() => {
        aboutBtn.toggleClass("fa-chevron-circle-down fa-chevron-circle-up");
    });

    $(".dropdown-menu li a").click(function (e) {
        e.preventDefault();
        $("#sortBtn:first-child").html($(this).text());
        $(this).siblings().removeClass('active');
        $(this).siblings().find('.active').removeClass('active');
    });

    book.click(function() {
        let id = $(this).attr("data-id");
        window.location.href = "/book/" + id;
    })
});