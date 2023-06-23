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
    $('#post-edit').off('click').on('click', function(){
        var postContent = document.getElementById("post-content-main");
        var postBody = document.getElementById("post-body");

        $(postContent).attr("contenteditable", "true");
        var editFooter = document.createElement('div');

        var editConfirm = document.createElement('button');
        $(editConfirm).attr("contenteditable", "false");
        $(editFooter).addClass('edit-footer');
        $(editFooter).attr("id", "edit-footer-1");
        $(editConfirm).addClass('edit-button');
        $(editConfirm).attr("id", "edit-button-1");
        $(editConfirm).text("Edit");
        editFooter.appendChild(editConfirm);
        postBody.appendChild(editFooter);

        $('#edit-button-1').off('click').on('click', function(){
            var editFooter = document.getElementById('edit-footer-1');

            $(postContent).attr("contenteditable", "false");
            $(editFooter).remove();
        });
        
    });

    $('#edit-button').off('click').on('click', function(){
        $(postContent).setAttribute("contenteditable", "false");
        $(editFooter).remove();
    });
    
    // delete post
    $('#post-delete').click( function(){
        var postPage = document.getElementById("post-page-content-1");
        var mainPost = document.getElementById("main-post-1");
        var commentBox = document.getElementById("comment-box-1");
        var comments = document.getElementById("comment-section-1");

        var noticeBox = document.createElement('div');
        $(noticeBox).addClass('notice-box');
        $(noticeBox).text("This post has been deleted.");
        postPage.appendChild(noticeBox);
        
        $(mainPost).remove();
        $(commentBox).remove();
        $(comments).remove();
    });
    
    // vote update


    // add comment
    $('.comment-button').click( function(){
        var div_comment;
        var div_left, div_right;
        var div_pfp;
        var div_vote;
        var div_commenter;
        var div_comment_content;
        commentSection = document.getElementById("comment-section-1"),
        comment = document.createDocumentFragment();

        //div for comment
        div_comment = document.createElement('div');

        $(div_comment).addClass('comment');
        comment.appendChild(div_comment);

        //div left
        div_left = document.createElement('div');

        $(div_left).addClass('left-comment');
        div_comment.appendChild(div_left);

        //div right
        div_right = document.createElement('div');

        $(div_right).addClass('right-comment');
        div_comment.appendChild(div_right);

        //pfp
        div_pfp = document.createElement('div');
        // var img = document.createElement('img');
        // img.src = "../images/eve_square.jpg"
        // div_pfp.appendChild(img);

        $(div_pfp).addClass('pfp-comment');
        div_left.appendChild(div_pfp);

        //vote
        div_vote = document.createElement('div');
        
        var upvote = document.createElement('ion-button');
        // $(upvote).text('<ion-icon slot="icon-only" name="caret-up-outline"></ion-icon>');
        // $(upvote).addClass('upvote');
        upvote.innerHTML = '<ion-icon slot="icon-only" name="caret-up-outline" class="upvote"></ion-icon>';
        div_vote.appendChild(upvote);

        var numvote = document.createElement('div');
        $(numvote).text("0");
        div_vote.appendChild(numvote);

        var downvote = document.createElement('ion-button');
        // $(downvote).text('<ion-icon slot="icon-only" name="caret-down-outline"></ion-icon>');
        // $(downvote).addClass('downvote');
        downvote.innerHTML = '<ion-icon slot="icon-only" name="caret-down-outline" class="downvote"></ion-icon>';
        div_vote.appendChild(downvote);

        $(div_vote).addClass('vote-comment');
        div_left.appendChild(div_vote);

        //commenter
        div_commenter = document.createElement('div');
        var span = document.createElement('span');

        $(span).addClass('commenter-clickable');
        $(span).text("@eveiscool");
        div_commenter.appendChild(span);

        $(div_commenter).addClass('commenter');
        div_right.appendChild(div_commenter);

        //comment content
        var commentContent = $('.comment-box').val();
        div_comment_content = document.createElement('div');

        $(div_comment_content).text(commentContent);
        $(div_comment_content).addClass('comment-content');
        div_right.appendChild(div_comment_content);

        commentSection.appendChild(comment);
    });

    // edit comment
    

    // delete comment
    
});

function postSettings(){
    document.getElementById("setoptions").classList.toggle("show");
}