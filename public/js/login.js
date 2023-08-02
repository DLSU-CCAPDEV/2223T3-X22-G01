$(document).ready(function () {

    $('#username').keyup(function () {
  
        var username = $('#username').val();
  
        $.get('/getUsername', {username: username}, function (result) {
  
            
            if(result.username == username) {
                $('#username').css('background-color', 'red');
                $('#error').text('username does not exist');
                $('#submit').prop('disabled', true);
            }
  
            
            else {
                $('#username').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });
  });