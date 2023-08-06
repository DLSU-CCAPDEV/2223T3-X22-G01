const postButton = document.querySelector("#post-button");
const title = document.querySelector('#post-title');
const description = document.querySelector('#post-box');

postButton.onclick = function(){
    var titleText = title.value.trim();
    var descText = bufferText;

    var emptyTitle = titleText == '';
    var emptyDescription = descText == '';

    if (!emptyTitle && !emptyDescription){
        p = {
            title: titleText,
            description: descText,
            date: Date.now(),
            username: "oO0Eve0Oo"
        };

        $.post("/addPost",p);

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
