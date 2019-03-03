$(() => {
    const searchBtn = $('#searchBtn');

    searchBtn.click(() => {
        let searchInput = $('#searchBar').val().trim();
        let searchBy = $('#searchBy').val();
        if (searchBy === "title") {
            window.location.href = "/search/books/title/" + searchInput;
        } else if (searchBy === "genre") {
            window.location.href = "/search/books/genre/" + searchInput;
        } else if (searchBy === "author") {
            window.location.href = "/search/books/author/" + searchInput;
        } else if (searchBy === "book-id") {
            window.location.href = "/search/books/id/" + searchInput;
        } else if (searchBy === "author-id") {
            window.location.href = "/search/books/author/" + searchInput;
        }
    });
    // searchBtn.click(() => {
    //     let searchInput = $('#searchBar').val().trim();
    //     let searchBy = $('#searchBy').val();
    //     if (searchBy === "title") {
    //         $.ajax('/search/books/title/' + searchInput, {
    //             type: "GET",
    //         }).then(result => {
    //             console.log(result);
    //             window.location.href = "/search/books/title/" + searchInput;
    //         });
    //     } else if (searchBy === "genre") {
    //         $.ajax('/search/books/genre/' + searchInput, {
    //             type: "GET",
    //         }).then(result => {
    //             console.log(result);
    //             window.location.href = "/search/books/genre/" + searchInput;
    //         });
    //     } else if (searchBy === "author") {
    //         $.ajax('/search/books/author/' + searchInput, {
    //             type: "GET",
    //         }).then(result => {
    //             console.log(result);
    //             window.location.href = "/search/books/author/" + searchInput;
    //         });
    //     } else if (searchBy === "book-id") {
    //         $.ajax('/search/books/id/' + searchInput, {
    //             type: "GET",
    //         }).then(result => {
    //             console.log(result);
    //             window.location.href = "/search/books/id/" + searchInput;
    //         });
    //     } else if (searchBy === "author-id") {
    //         $.ajax('/search/books/author/' + searchInput, {
    //             type: "GET",
    //         }).then(result => {
    //             console.log(result);
    //             window.location.href = "/search/books/author/" + searchInput;
    //         });
    //     }
    // });
});