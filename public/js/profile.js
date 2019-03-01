$(document).ready(function () {
    //    button control
    // hide content
    $('#allBook').hide();
    $('#savedBook').hide();
    $('#recentBook').hide();
    // toggle content
    $('#allButton').click(() => {
        $('#allBook').toggle();
    });
    $('#savedButton').click(() => {
        $('#savedBook').toggle();
    });
    $('#recentButton').click(() => {
        $('#recentBook').toggle();
    });
    
    var books = [
        { 
            title: 'Book1',
            body: 'this is a book example',
            genre: 'adventure',
            imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeE-XUkjXgBWaqNaMprbN58CCXIOo8UxSQickhEYJw2b3Bae2dA',
            views:'520',
            rating:'5'

        },
        { 
            title: 'Book2',
            body: 'this is a another book example',
            genre: 'scifi',
            imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeE-XUkjXgBWaqNaMprbN58CCXIOo8UxSQickhEYJw2b3Bae2dA',
            views:'400',
            rating:'3'

        },
        { 
            title: 'Book3',
            body: 'this is the last book example',
            genre: 'Erotica',
            imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeE-XUkjXgBWaqNaMprbN58CCXIOo8UxSQickhEYJw2b3Bae2dA',
            views:'10000',
            rating:'7'

        },
    ];

    $('#recentBook').append(books.slice(-1)[0].title);
    // gettin title from all books in the object
        books.forEach((x, i) => {
        var list = `
            <li>
                ${x.title}
            </li>
            `;
        $('#allBook').append(list);
    });



    // title, body, text_limit, genre, imageUrl, views, rating, completed
    // $('#recentBook').append(bookswritten.slice(-1)[0]);
    // bookswritten.forEach((x, i) => {
    //     var list = `
    //         <li>
    //             ${x}
    //         </li>
    //         `;
    //     $('#allBook').append(list);
    // });









});