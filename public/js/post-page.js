const commentBox = document.querySelector('#comment-box');
const commentButton = document.querySelector('#comment-button');
const pID = window.location.href.split('/')[4];

const postDesc = document.querySelector('#post-description');

let parsedDesc = DOMPurify.sanitize(marked.parse(postDesc.innerHTML));
postDesc.innerHTML = parsedDesc;


//addComment
commentButton.onclick = function(){
    var commentText = commentBox.innerText.trim();

    if (commentText == '') return;
    
    var c = {
        commenterUsername: "oO0Eve0Oo",
        commentDate: Date.now(),
        commenterIcon: "pfp_eve.jpg",
        commentDesc: commentText,
        postID: pID
    }

    var commentHTML = `
        <div class="comment">
            <div class="comment-inner">
                <a href="/${c.commenterUsername}"><div style="background-image: url(../images/${c.commenterIcon})" class="post-pfp pfp-small glasshover"></div></a>
                <div class="vote-container">
                            
                    <div>0</div>

                </div>
            </div>
            <div class="comment-inner full">
                <div class="comment-header">
                    <span class="commenter-username">${c.commenterUsername}</span>
                </div>
                <p class="comment-content full" id="comment-description" contenteditable="false">
                    ${c.commentDesc}
                </p>

                <div class="comment-footer">
                    Posted just now
                </div>
            </div>
        </div>
    
    `

    var commentSection = document.querySelector('#comment-section');
    commentSection.insertAdjacentHTML("beforeend", commentHTML);
    
    $.post("/addComment",c);
    commentBox.innerHTML = '';
};

function deleteComment(id){
    var id_num = id.replace(/^\D+/g, '');
    var commentDiv = document.querySelector('#comment-'+id_num);
    commentDiv.remove();
    
    $.post("/deleteComment",{commentID: id_num, postID: pID});

}

const deleteButton = document.querySelector('#p-del');

deleteButton.onclick = function deletePost(){
    $.post("/deletePost",{postID: pID});
    location.href = '/home';
}

function upvotePost(){

    var upvoteButton = document.querySelector('#up');
    var downvoteButton = document.querySelector('#down');
    var voteText = document.querySelector('#votes');

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

    $.post("/upvotePost",{postID: pID});
}

function downvotePost(){

    var upvoteButton = document.querySelector('#up');
    var downvoteButton = document.querySelector('#down');
    var voteText = document.querySelector('#votes');

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

    $.post("/downvotePost",{postID: pID});
}

function upvoteComment(id){
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

    $.post("/upvoteComment",{postID: pID, commentID: id_num});
}

function downvoteComment(id){

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

    $.post("/downvoteComment",{postID: pID, commentID: id_num});
}