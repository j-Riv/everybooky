$('#createBookForm').submit(function(event) {
    event.preventDefault();
    if ($('#createBookForm')[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
        //do your ajax submition here
        let book = {
            title: $('#title').val().trim(),
            genre: $('#genre').val().trim(),
            limit: $('#limit').val().trim(),
            imageUrl: $('#imageUrl').val().trim(),
            author: $('#userId').val().trim(),
            body: $('#body').val().trim()
        }
        console.log(book);
        $.ajax('/api/book', {
            type: "POST",
            data: book
        }).then(result => {
            var bookId = result.id
            if (result) {
                let post = {
                    line: $('#post').val().trim(),
                    userId: $('#userId').val().trim(),
                    bookId: bookId
                }
                $.ajax('/api/book/post', {
                    type: "POST",
                    data: post
                }).then(result => {
                    window.location.href = "/book/" + bookId;
                });
            }
            // else redirects to error page
        }).catch(error => {
            console.log(error);
        });
    }
    $('#createBookForm').addClass('was-validated');
});