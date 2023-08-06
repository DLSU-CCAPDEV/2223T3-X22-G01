const commentBox = document.querySelector('#comment-box');
const commentButton = document.querySelector('#comment-button');
const pID = window.location.href.split('/')[4];

const postDesc = document.querySelector('#post-description');

var rawDesc = postDesc.innerText;
var parsedDesc = DOMPurify.sanitize(marked.parse(postDesc.innerHTML));
postDesc.innerHTML = parsedDesc;


//addComment
function insertComment(){
    var commentText = commentBox.innerText.trim();

    if (commentText == '') return;
    
    var c = {
        commenterUsername: sessionData.username,
        commentDate: Date.now(),
        commenterIcon: sessionData.icon,
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

if (deleteButton) {
    deleteButton.onclick = function deletePost(){
        $.post("/deletePost",{postID: pID});
        location.href = '/home';
    }
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

function loginPrompt() {
    location.href = '/login';
}

const editButton = document.querySelector('#p-edit');

if(editButton){
    editButton.onclick = function(){
    
        //stops adding more edit buttons
        if(document.getElementById("post-save")==null){
            var postTitle = document.getElementById("post-title");
            var postBody = document.getElementById("post-description");
            postBody.innerHTML = rawDesc;
            var postBodyContainer = document.getElementById("post-description-container");
            
            postTitle.contentEditable = "true";
            postBody.contentEditable = "true";

            
    
            var saveButton = `
                <div class="edit-footer">
                    <button class="edit-button" id="post-save" onclick="savePost(this)" contenteditable="false">Save</button>    
                </div>
            `
            postBodyContainer.insertAdjacentHTML('beforeend', saveButton);
        }
    }
    
    function savePost(){;
        var button = document.getElementById("post-save");
        button.remove();
    
        var postTitle = document.getElementById("post-title");
        var postBody = document.getElementById("post-description");

        $.post("/editPost",{postID: pID, description: postDesc.innerText});
        
        rawDesc = postBody.innerText;
        var parsedDesc = DOMPurify.sanitize(marked.parse(postDesc.innerHTML));
        postBody.innerHTML = parsedDesc;
    
        postTitle.contentEditable = "false";
        postBody.contentEditable = "false";
    
        //p.title = postTitle.innerHTML;
        //p.description = postBody.innerHTML;
    
        //localStorage.setItem('post',JSON.stringify(post)); //save function
    }
}

function editComment(id){
    var id_num = id.replace(/^\D+/g, '');
    
    //stops adding more edit buttons
    if(document.getElementById("save-"+id_num)==null){
        var commentBody = document.getElementById("comment-description-"+id_num);
        var commentFooter = document.getElementById("comment-footer-"+id_num);

        commentBody.contentEditable = "true";
        
        var saveButton = `
            
           <button id="save-${id_num}" onclick="saveComment(this)" contenteditable="false">Save</button>    
            
        `
        commentFooter.insertAdjacentHTML('beforeend', saveButton);
    }
}

function saveComment(button){
    var id_num = button.id.replace(/^\D+/g, '');
    
    button.remove();

    var commentBody = document.getElementById("comment-description-"+id_num);
    commentBody.contentEditable = "false";

    $.post("/editComment",{postID: pID, commentID: id_num, description: commentBody.innerText});

    //var c = p.comments.find(t => t.id == id_num);
    //c.description = commentBody.innerHTML;
    //localStorage.setItem('post',JSON.stringify(post)); //save function
}

