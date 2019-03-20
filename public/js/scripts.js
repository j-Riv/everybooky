// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// confirm password validation
if (document.getElementById("confirmPassword")) {
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirmPassword");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

}

// search
let searchType = 'Title';
// get search type
$('#typeList a').on('click', function() {
    searchType = $(this).html();
});
// do the search
$('#searchButton').on('click', function() {
    const searchTerm = $('#searchBar').val().trim();
    // if not empty
    if (searchType === '') {
        searchType = 'Title'
    }
    if (searchType !== '' && searchTerm !== '') {
        if (searchType === 'Title') {
            window.location.href = '/search/books/title/' + searchTerm;
        }
        if (searchType === 'Genre') {
            window.location.href = '/search/books/genre/' + searchTerm;
        }
    }
});

// Delete book button
$('.delete-btn').click(function(e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    console.log('id:' + id);
    $.ajax('/api/book/' + id, {
        type: 'DELETE'
    }).then(result => {
        location.reload();
    }).catch(error => {
        console.log(error);
    });
});

// tooltips
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
