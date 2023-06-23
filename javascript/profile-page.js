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
        
    });

    //write post
    $('.post-button').on('click', function(){
        var div_userPost,
            div_leftPost,
            div_userPfp,
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

        $(div_userPost).addClass('user-post');
        post.appendChild(div_userPost);

        //div for left-post
        div_leftPost = document.createElement('div');

        $(div_leftPost).addClass('left-post');
        div_userPost.appendChild(div_leftPost);

        // div for right-post
        div_rightPost = document.createElement('div');

        $(div_rightPost).addClass('right-post');
        div_userPost.appendChild(div_rightPost);

        // div for user-pfp
        div_userPfp = document.createElement('div');

        $(div_userPfp).addClass('user-pfp');
        div_leftPost.appendChild(div_userPfp);

        //div for vote-post
        div_votePost = document.createElement('div');

        var upvote = document.createElement('ion-button');
        upvote.innerHTML = '<ion-icon slot="icon-only" name="caret-up-outline" class="upvote"></ion-icon>';
        div_votePost.appendChild(upvote);

        var numvote = document.createElement('div');
        $(numvote).text("0");
        div_votePost.appendChild(numvote);

        var downvote = document.createElement('ion-button');
        downvote.innerHTML = '<ion-icon slot="icon-only" name="caret-down-outline" class="downvote"></ion-icon>';
        div_votePost.appendChild(downvote);

        $(div_votePost).addClass('vote-post');
        div_leftPost.appendChild(div_votePost);

        //div for user-details
        div_userDetails = document.createElement('div');

        $(div_userDetails).addClass('user-details');
        div_rightPost.appendChild(div_userDetails);

        //div for display-name
        div_displayName = document.createElement('div');

        $(div_displayName).text("Eve");

        $(div_displayName).addClass('display-name');
        div_userDetails.appendChild(div_displayName);

        //div for username
        div_userName = document.createElement('div');

        $(div_userName).text("@eveiscool");

        $(div_userName).addClass('username');
        div_userDetails.appendChild(div_userName);

        //div for post
        div_post = document.createElement('div');
        var postContent = $('.post-box').val();

        $(div_post).text(postContent);

        $(div_post).addClass('post');
        div_rightPost.appendChild(div_post);

        //div for post-details
        div_postDetails = document.createElement('div');

        $(div_postDetails).text("Just now | 0 replies");

        $(div_postDetails).addClass('post-details');
        div_rightPost.appendChild(div_postDetails);

        postSection.appendChild(post);
    });

});