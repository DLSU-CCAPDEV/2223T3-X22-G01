const postButton = document.querySelector("#post-button");
const title = document.querySelector('#post-title');
const description = document.querySelector('#post-box');
const postDiv =  document.querySelector('#page-content');

function insertPost(){
    var titleText = title.value.trim();
    var descText = bufferText;

    var emptyTitle = titleText == '';
    var emptyDescription = descText == '';

    if (!emptyTitle && !emptyDescription){
        p = {
            title: titleText,
            description: descText,
            date: Date.now(),
            username: sessionData.username,
            icon: sessionData.icon
        };

        $.post("/addPost",p);

        var newPost = `
            <div class="post">
                <div class="post-content glasshover">
                    
                    <div class="vote-container vote-width">
                        <div id="votes">0</div>
                    </div>

                        <div class="post-text">
                            
                            <h1>${p.title}</h1>
                            <h2>${p.username} | Just now | 0 replies</h2>
                            
                        </div>

                </div>
                <a href="/${p.username}"><div style="background-image: url(../images/${p.icon})" class="post-pfp glasshover"></div></a>
            </div>
        `

        postDiv.insertAdjacentHTML('beforeend', newPost);

        title.value = '';
        description.innerText = '';
    }
};

var bufferText = "";
description.onfocus = function(){
    var descText = description.innerText.trim();
    if (descText == '') return;

    description.innerText = bufferText;
}

description.onblur = function(){
    var descText = description.innerText.trim();
    if (descText == '') return;

    bufferText = description.innerText;
    descText = DOMPurify.sanitize(marked.parse(description.innerText));
    description.innerHTML = descText;

}

function upvotePost(id){
    var id_num = id.replace(/^\D+/g, '');

    var upvoteButton = document.querySelector('#up-'+id_num);
    var downvoteButton = document.querySelector('#down-'+id_num);
    var voteText = document.querySelector('#votes-'+id_num);

    var isUpvoted = upvoteButton.style.color == "var(--HLsecondary)";
    var isDownvoted = downvoteButton.style.color == "var(--HLsecondary)";

    var state = 2*isUpvoted + isDownvoted;
    var voteCount = Number(voteText.innerText);
    //alert(state);

    switch(state){
        case 2: //was upvoted
            upvoteButton.style.color = "var(--secondary)";
            voteCount--; 
            break;
        case 1: //was downvoted
            downvoteButton.style.color = "var(--secondary)";
            voteCount++; 
        case 0: //no action
            upvoteButton.style.color = "var(--HLsecondary)";
            voteCount++; 
    }

    voteText.innerText = voteCount;

    $.post("/upvotePost",{postID: id_num});
}

function downvotePost(id){
    var id_num = id.replace(/^\D+/g, '');

    var upvoteButton = document.querySelector('#up-'+id_num);
    var downvoteButton = document.querySelector('#down-'+id_num);
    var voteText = document.querySelector('#votes-'+id_num);

    var isUpvoted = upvoteButton.style.color == "var(--HLsecondary)";
    var isDownvoted = downvoteButton.style.color == "var(--HLsecondary)";

    var state = 2*isUpvoted + isDownvoted;
    var voteCount = Number(voteText.innerText);
    //alert(state);

    switch(state){
        case 1: //was downvoted
            downvoteButton.style.color = "var(--secondary)";
            voteCount++; 
            break;
        case 2: //was upvoted
            upvoteButton.style.color = "var(--secondary)";
            voteCount--; 
        case 0: //no action
            downvoteButton.style.color = "var(--HLsecondary)";
            voteCount--; 
    }

    voteText.innerText = voteCount;

    $.post("/downvotePost",{postID: id_num});
}

function loginPrompt() {
    location.href = '/login';
}

function editProfile(){
    document.getElementById('display-name').contentEditable = "true";
    document.getElementById('user-bio').contentEditable = "true";
    var button = document.getElementById('edit-profile');
    
    var pfp = document.getElementById('profile-photo');
    var editpfp = `
        
        <div id="image-upload">
            <label for="file-input">
                <ion-icon name="image-outline"></ion-icon>
            </label>

            <input id="file-input" type='file' onchange='loadImg(event)'>
        </div>
    `

    pfp.insertAdjacentHTML('afterend',editpfp);

    button.innerHTML="Save Profile";
    button.setAttribute('onclick','saveProfile()')

}

function loadImg(event) {
    var newIcon = document.getElementById('profile-photo');
    newIcon.style.backgroundImage = "url('"+URL.createObjectURL(event.target.files[0])+"')";
}

function saveProfile(){
    var name = document.getElementById('display-name');
    var username = document.getElementById('username');
    var bio = document.getElementById('user-bio');
    var button = document.getElementById('edit-profile');

    document.getElementById('image-upload').remove();

    name.contentEditable = "false";
    bio.contentEditable = "false";

    $.post("/editProfile",{username: username.innerText.substring(1),displayName: name.innerText, bio: bio.innerText});

    button.innerHTML="Edit Profile";
    button.setAttribute('onclick','editProfile()')

}

