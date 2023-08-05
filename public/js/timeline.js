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