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
});