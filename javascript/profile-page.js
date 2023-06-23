$(document).ready( function(){

    //edit profile
    $('.user-edit-profile').on('click', function(){
        var prof_displayName, prof_username, prof_userBio;

        prof_displayName = document.getElementById('display-name-1');
        prof_username = document.getElementById('username-1');
        prof_userBio = document.getElementById('user-bio-1');

        prof_displayName.setAttribute("contenteditable", "true");
        prof_username.setAttribute("contenteditable", "true");
        prof_userBio.setAttribute("contenteditable", "true");

        $('.user-edit-profile').text("Save changes");

        $('.user-edit-profile').on('click', function(){
            prof_displayName.setAttribute("contenteditable", "false");
            prof_username.setAttribute("contenteditable", "false");
            prof_userBio.setAttribute("contenteditable", "false");
            $('.user-edit-profile').text("Edit profile");
        });
        
    });

    //write post
    $('.post-button').on('click', function(){
        var div_userPost,
            div_leftPost,
            div_votePost,
            div_rightPost,
            div_userDetails,
            div_displayName,
            div_userName,
            div_post,
            div_postDetails;

        postSection = document.getElementById("posts-section-1");
        post = document.createDocumentFragment();

        //div for user-post
        div_userPost = document.createElement('div');

        $(div_userPost).addClass('post');
        post.appendChild(div_userPost);

        //div for left-post
        div_leftPost = document.createElement('div');

        $(div_leftPost).addClass('post-content glasshover');
        div_userPost.appendChild(div_leftPost);

        // div for right-post
        div_rightPost = document.createElement('div');

        $(div_rightPost).addClass('post-pfp glasshover pfp-4');
        div_userPost.appendChild(div_rightPost);

        //div for vote-post
        div_votePost = document.createElement('div');
        $(div_votePost).addClass('post-vote')

        var upvote = document.createElement('ion-button');
        upvote.innerHTML = '<ion-icon slot="icon-only" name="caret-up-outline" class="upvote"></ion-icon>';
        div_votePost.appendChild(upvote);

        var numvote = document.createElement('div');
        $(numvote).text("0");
        div_votePost.appendChild(numvote);

        var downvote = document.createElement('ion-button');
        downvote.innerHTML = '<ion-icon slot="icon-only" name="caret-down-outline" class="downvote"></ion-icon>';
        div_votePost.appendChild(downvote);

        div_leftPost.appendChild(div_votePost);

        //div for user-details
        div_userDetails = document.createElement('div');

        $(div_userDetails).addClass('post-text');
        div_leftPost.appendChild(div_userDetails);

        //div for post
        div_post = document.createElement('div');
        var postContent = $('.post-title').val();
        var username = $('.username').text();

        $(div_post).text(postContent);

        $(div_post).addClass('post-query');
        div_userDetails.appendChild(div_post);

        //div for post-details
        div_postDetails = document.createElement('div');

        $(div_postDetails).text(username + " | Just now | 0 replies");

        $(div_postDetails).addClass('post-details');
        div_userDetails.appendChild(div_postDetails);

        postSection.appendChild(post);
    });

});