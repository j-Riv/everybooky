$(() => {
    const submitBtn = $('#createBook');

    submitBtn.click((e) => {
        e.preventDefault();
        let book = {
            title: $('#title').val().trim(),
            genre: $('#genre').val().trim(),
            limit: $('#limit').val().trim(),
            // type: $('#type').val().trim(),
            // colab: $('#maxCol').val().trim(),
            body: $('#body').val().trim(),
            // private: $('#private').val().trim()
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
                    console.log(result)
                    console.log('should redirect')
                    window.location.href = "/book/" + bookId;
                })
            }
            // else redirects to error page
        }).catch(error => {
            console.log(error);
        })
    });
});
