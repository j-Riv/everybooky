$(() => {
    const searchBtn = $('#searchBtn');
    
    searchBtn.click( () => {
        let searchInput = $('#searchBar').val().trim();
        let searchBy = $('#searchBy').val();
        if (searchBy === "title") {
            $.ajax('/api/books/title/' + searchInput, {
                type: "GET",
            }).then(result => {
                console.log(result);
                window.location.href = "/api/books/title/" + searchInput;
            });
        }
        else if (searchBy === "genre") {
            $.ajax('/api/books/genre/' + searchInput, {
                type: "GET",
            }).then(result => {
                console.log(result);
                window.location.href = "/api/books/genre/" + searchInput;
            });
        }
        // else if (searchBy === "author") {
        //     $.ajax('/api/books/author/' + searchInput, {
        //         type: "GET",
        //     }).then(result => {
        //         console.log(result);
        //         window.location.href = "/api/books/author/" + searchInput;
        //     });
        // }
        // else if (searchBy === "book-id") {
        //     $.ajax('/api/books/id/' + searchInput, {
        //         type: "GET",
        //     }).then(result => {
        //         console.log(result);
        //         window.location.href = "/api/books/id/" + searchInput;
        //     });
        // }
        // else if (searchBy === "author-id") {
        //     $.ajax('/api/books/author/' + searchInput, {
        //         type: "GET",
        //     }).then(result => {
        //         console.log(result);
        //         window.location.href = "/api/books/author/" + searchInput;
        //     });
        // }
    })
});