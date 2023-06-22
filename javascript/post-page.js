$(document).ready( function(){
    //post dropdown settings
    // function postSettings();
    window.onclick = function(event) {
        if (!event.target.matches('.postsetbtn')) {
            var dropdowns = document.getElementsByClassName("post-setting-option");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    // edit post
    // content('#post-content',"whatever");
    
    // delete post

    
    // vote update


    // add comment
    $('.comment-button').click( function(){
        var comment = $('.comment-box').val();
        var div_element = document.createElement('div');

        $(div_element).text(comment);
        $(div_element).addClass('comment-content');
        //<p class='tweet_text'> tweet </p>
        $('#comment-content').append(div_element);
    });

    // edit comment


    // delete comment
    
});

function postSettings(){
    document.getElementById("setoptions").classList.toggle("show");
}

// function content(divSelector, value) {
//     document.querySelector(divSelector).innerHTML = value;
// }