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

// scroll to element
$('#viewTeam').click(function() {
    $('html, body').animate({
        scrollTop: $('#theTeam').offset().top
    }, 2000);
});

// socket.io
$(function() {
    var socket = io();

    $('#addLine').on('click', function(e) {
        e.preventDefault();
        const theLine = {
            line: $('#line').val().trim(),
            userId: $('#userId').val().trim(),
            bookId: $('#bookId').val().trim()
        }
        console.log('Line: ' + $('#line').val().trim());
        socket.emit('added line', $('#line').val().trim());
        $.ajax('/api/book/post', {
            type: 'POST',
            data: theLine
        }).then(
            function(result) {
                console.log('response from server:' + result);
            }
        );
        $('#line').val('');
        return false;
    });

    //get changes
    socket.on('added line', function(theLine) {
        console.log('added line: ' + theLine.line);
        let content = `
                <span>${theLine.line}</span>
            `;
        $('#bookContent').append(content);
    }); 

    $('#line').keyup(function () {
        var max = 160;
        var len = $(this).val().length;
        if (len >= max) {
          $('#charNum').text(' you have reached the limit');
        } else {
          var char = max - len;
          $('#charNum').text(char + ' characters left');
        }
      });
});