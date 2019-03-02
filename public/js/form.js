$(() => {
    const submitBtn = $('#createBook');

    submitBtn.click( (e) => {
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
        $.ajax('/api/book', {
            type: "POST",
            data: book
        }).then( result => {
            console.log(result);
            console.log('posted');
            if (result) {
                window.location.href = "/book/" + result.id;
            }
        }).catch(error => {
            console.log(error);
        })
    });
});
