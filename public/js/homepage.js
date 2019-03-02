$(() => {
    const aboutBtn = $("#aboutBtn");
    const searchBy = $('#toggleSwitch');

    // Controls the little button in the jumbotron
    aboutBtn.click(() => {
        aboutBtn.toggleClass("fa-chevron-circle-down fa-chevron-circle-up");
    });


    $(".dropdown-menu li a").click(function (e) {
        e.preventDefault();
        $("#sortBtn:first-child").html($(this).text());
        $(this).siblings().removeClass('active');
        $(this).siblings().find('.active').removeClass('active');
    });

    searchBy.click( () => {
        $('#searchOptions').toggleClass("d-none");
    })
});