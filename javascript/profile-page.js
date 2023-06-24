$(document).ready( function(){

    //edit profile
    $('#edit-profile').off('click').on('click', function(){
        var prof_userInfo, prof_displayName, prof_username, prof_userBio, saveChanges, editProfile;
        
        //new pfp
        var prof_userPfp = document.getElementById('user-pfp-1');
        var label_changeImg, span_changeImg, input_fileImg;

        label_changeImg = document.createElement('label');
        $(label_changeImg).addClass('change-img-label');
        $(label_changeImg).attr("for", "img-file");
        span_changeImg = document.createElement('span');
        $(span_changeImg).addClass('change-img-span');
        span_changeImg.innerHTML = '<ion-icon name="image-outline"></ion-icon>';
        input_fileImg = document.createElement('input');
        input_fileImg.type="file";
        $(input_fileImg).attr("id", "img-file");
        $(input_fileImg).attr("onchange", "loadImg(event)");

        label_changeImg.appendChild(span_changeImg);
        prof_userPfp.appendChild(label_changeImg);
        prof_userPfp.appendChild(input_fileImg);

        

        //other deets
        prof_userInfo = document.getElementById('user-info-1');
        prof_displayName = document.getElementById('display-name-1');
        prof_username = document.getElementById('username-1');
        prof_userBio = document.getElementById('user-bio-1');
        editProfile = document.getElementById('edit-profile');
        saveChanges = document.getElementById('save-changes');

        $(prof_displayName).attr("contenteditable", "true");
        $(prof_username).attr("contenteditable", "true");
        $(prof_userBio).attr("contenteditable", "true");
        
        $('#edit-profile').hide();
        $('#save-changes').show();

        $('#save-changes').off('click').on('click', function(){
            $(label_changeImg).remove();
            $(input_fileImg).remove();

            $(prof_displayName).attr("contenteditable", "false");
            $(prof_username).attr("contenteditable", "false");
            $(prof_userBio).attr("contenteditable", "false");
            
            $('#save-changes').hide();
            $('#edit-profile').show();
        });
    });

    //update numvote (starting from 3)
    $('.upvote').off('click').on('click', function(){
        
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
        var img = document.createElement('img');
        // var icon = document.getElementById('user-icon');

        // $(div_userPfp).addClass('user-pfp');

        // img.src = document.querySelector('user-icon');
        // div_userPfp.appendChild(img);

        div_leftPost.appendChild(div_userPfp);

        //div for vote-post
        div_votePost = document.createElement('div');

        var upvote = document.createElement('ion-button');
        $(upvote).addClass('upvote');
        upvote.innerHTML = '<ion-icon slot="icon-only" name="caret-up-outline"></ion-icon>';
        div_votePost.appendChild(upvote);

        var numvote = document.createElement('div');
        $(numvote).addClass('numvote');
        $(numvote).text("0");
        div_votePost.appendChild(numvote);

        //id="numvote-#"
        /*var numvoteID = document.querySelector(".numvote");
        var incr = 3;
        for(var i=1; i<numvoteID.length;i++){
            numvoteID[i].id='numvote-'+incr;
            incr++;
        }*/

        var downvote = document.createElement('ion-button');
        $(downvote).addClass('downvote');
        downvote.innerHTML = '<ion-icon slot="icon-only" name="caret-down-outline"></ion-icon>';
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

function loadImg(event) {
    var newIcon = document.getElementById('user-icon');
    newIcon.src = URL.createObjectURL(event.target.files[0]);
}