const commentBox = document.querySelector('#comment-box');
const commentButton = document.querySelector('#comment-button');
const pID = window.location.href.split('/')[4];
//addComment
commentButton.onclick = function(){
    if (commentBox.innerHTML.replace(/\s+/g, '') == '') return;
    
    var c = {
        commenterUsername: "oO0Eve0Oo",
        commentDate: Date.now(),
        commentVotes: 0,
        commenterIcon: "pfp_eve.jpg",
        commentDesc: commentBox.innerHTML.trim(),
        postID: pID
    }

    var commentHTML = `
        <div class="comment">
            <div class="comment-inner">
                <a href="/${c.commenterUsername}"><div style="background-image: url(../images/${c.commenterIcon})" class="post-pfp pfp-small glasshover"></div></a>
                <div class="vote-container">

                    <ion-button>
                        <ion-icon name="caret-up-outline"></ion-icon>
                    </ion-button>
                            
                    <div>${c.commentVotes}</div>

                    <ion-button>
                        <ion-icon name="caret-down-outline"></ion-icon>
                    </ion-button>
                    
                </div>
            </div>
            <div class="comment-inner full">
                <div class="comment-header">
                    <span class="commenter-username">${c.commenterUsername}</span>
                    <nav class="dropdown-container">
                            <ion-icon class="dropdown-button" name="ellipsis-horizontal"></ion-icon>

                            <div class="dropdown-items">
                                <button id="edit" onclick="edit(this.id)">Edit</button>
                                <button id="del" onclick="del(this.id)">Delete</button>
                            </div>
                    </nav>
                </div>
                <p class="comment-content full" id="comment-description" contenteditable="false">
                    ${c.commentDesc}
                </p>

                <div class="comment-footer">
                    Posted on ${c.commentDate}
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