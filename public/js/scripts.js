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
let searchType;
// get search type
$('#typeList a').on('click', function() {
    searchType = $(this).html();
    console.log('search type: ' + searchType);
});
// do the search
$('#searchButton').on('click', function() {
    console.log('search clicked');
    const searchTerm = $('#searchBar').val().trim();
    // if not empty
    if (searchTerm !== '') {
        searchTerm = 'Title'
    }
    if (searchType === 'Title') {
        window.location.href = '/search/books/title/' + searchTerm;
    }
    if (searchType === 'Genre') {
        window.location.href = '/search/books/genre/' + searchTerm;
    }
});