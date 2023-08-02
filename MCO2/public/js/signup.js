$(document).ready(function () {

    $('#username_signup').keyup(function () {
  
        var username = $('#username_signup').val();
  
        $.get('/getCheckUsername', {username: username}, function (result) {
  
            
            if(result.username == username) {
                $('#username_signup').css('background-color', 'red');
                $('#error').text('username has already been used');
                $('#submit').prop('disabled', true);
            }
  
            
            else {
                $('#username_signup').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });
  });