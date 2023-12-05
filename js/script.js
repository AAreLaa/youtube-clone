// for every click event
window.onclick = (event) => {
    searchRecommendation();
    openCloseUploadModal(event.target.closest(".upload-modal"), event.target.closest(".header__upload-icon-button"));
    openCloseNotificationModal(event.target.closest(".notification-modal"), event.target.closest(".header__bell-icon-button"));
    openCloseShareModal(event.target.closest(".content-share-modal"), event.target.closest(".content-share"), event.target);
}

//for showing search recommendation
const searchRecommendation = () => {
    const searchBar = document.getElementById("search-bar");
    const recommendation = document.getElementsByClassName("search-recommendation");
    if (document.activeElement === searchBar) {
        recommendation[0].style.display = "block";
    }
    else {
        recommendation[0].style.display = "none";
    }
}

//opening and closing the upload modal
const openCloseUploadModal = (modalClick, buttonClick) => {
    const uploadModal = document.getElementsByClassName("upload-modal");
    const uploadButton = document.getElementsByClassName("header__upload-icon-button");

    // add (|| modalClick == uploadModal[0]) to close modal when clicked on modal too

    if (buttonClick == uploadButton[0]) {
        uploadModal[0].classList.toggle("upload-modal_show");
        uploadButton[0].classList.toggle("header__upload-icon-button_active");
    }
    else if (buttonClick != uploadButton[0] && modalClick != uploadModal[0]) {
        uploadModal[0].classList.remove("upload-modal_show");
        uploadButton[0].classList.remove("header__upload-icon-button_active");
    }
    scrollDisable();
}


//opening and closing the notification modal
const openCloseNotificationModal = (modalClick, buttonClick) => {
    const notificationModal = document.getElementsByClassName("notification-modal");
    const notificationButton = document.getElementsByClassName("header__bell-icon-button");
    if (buttonClick == notificationButton[0]) {
        notificationModal[0].classList.toggle("notification-modal_show");
        notificationButton[0].classList.toggle("header__bell-icon-button_active");
    }
    else if (buttonClick != notificationButton[0] && modalClick != notificationModal[0]) {
        notificationModal[0].classList.remove("notification-modal_show");
        notificationButton[0].classList.remove("header__bell-icon-button_active");
    }
    scrollDisable();
}

//scrolling disabled when notification or upload modal is open
const scrollDisable = () => {
    const uploadModal = document.getElementsByClassName("upload-modal");
    const notificationModal = document.getElementsByClassName("notification-modal");
    let scrollTop = window.scrollY;
    let scrollLeft = window.scrollX;
    if (notificationModal[0].classList.contains("notification-modal_show") || uploadModal[0].classList.contains("upload-modal_show")) {
        window.onscroll = () => {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }
    else {
        window.onscroll = () => { };
    }
}

//play recommended video

const playRecommendedVideo = (url, title) => {
    document.getElementsByTagName('iframe')[0].src = url;
    document.getElementsByClassName('content-title')[0].innerHTML = title;
}

//for content like/dislike
const contentLike = () => {
    let likeCount = document.getElementsByClassName("likes")[0];
    let likeButton = document.getElementsByClassName("content-like")[0];
    let dislikeButton = document.getElementsByClassName("content-dislike")[0];
    if (!likeButton.classList.contains("content-like_active")) {
        likeCount.innerHTML = parseFloat(likeCount.innerText) + 1 + 'k';
        likeButton.classList.add("content-like_active");
        dislikeButton.classList.remove("content-dislike_active")
    }
    else {
        likeCount.innerHTML = parseFloat(likeCount.innerText) - 1 + 'k';
        likeButton.classList.remove("content-like_active");
    }
}

const contentDislike = () => {
    let likeCount = document.getElementsByClassName("likes")[0];
    let likeButton = document.getElementsByClassName("content-like")[0];
    let dislikeButton = document.getElementsByClassName("content-dislike")[0];
    dislikeButton.classList.toggle("content-dislike_active");
    if (likeButton.classList.contains("content-like_active")) {
        likeCount.innerHTML = parseFloat(likeCount.innerText) - 1 + 'k';
        likeButton.classList.remove("content-like_active");
    }

}

//opening and closing content share modal
const openCloseShareModal = (modalClick, buttonClick, checkClick) => {
    const shareModal = document.getElementsByClassName("content-share-modal");
    const shareButton = document.getElementsByClassName("content-share");
    const modalBackground = document.getElementsByClassName("modal-background")[0];
    const closeModal = document.getElementsByClassName("cross");
    if (buttonClick == shareButton[0]) {
        shareModal[0].classList.toggle("content-share-modal_show");
        modalBackground.classList.toggle("modal-background_show");
    }
    else if ((buttonClick != shareButton[0] && modalClick != shareModal[0]) || closeModal[0] == checkClick) {
        shareModal[0].classList.remove("content-share-modal_show");
        modalBackground.classList.remove("modal-background_show");
    }
}

//copy youtube link from share modal

const copyToClipboard = () => {
    let copy = document.getElementById("youtube-link").innerText;
    let notification = document.getElementsByClassName("copied-notification")[0];
    notification.style.display = "block"
    navigator.clipboard.writeText(copy);
    setTimeout((() => {
        notification.style.display = "none";
    }), 2000)

}

//fetch and show comments in comment section
showComment = () => {
    fetch("./assests/data/comments.json")
        .then((response) => {
            return response.json();
        })
        .then((comment) => {
            let addComment = '';
            let insertComment = document.getElementsByClassName("old-comment")[0];
            for (let i of comment.comments) {
                addComment += `
        <div class="comment-container" id=${i.id}>
                        <div class="comments">
                            <img src=${i.authorProfileImageUrl} alt="" class="comment-channel-img">
                            <div class="comment-channel-info">
                                <span class="comment-channel-name">${i.authorDisplayName}</span>
                                <span class="comment-channel-date">${i.authorPostDate}</span>
                                <p class="display-comment">${i.authorComment}</p>
                            </div>
                        </div>
                        <div class="comment-like-dislike">
                            <div class="comment-like">
                                <img src="assests/images/icons/like.svg" alt="like" class="comment-like-icon">
                                <div class="tooltip">Like</div>
                            </div>
                            <span class="likes">${i.authorCommentLikes}</span>
                            <div class="comment-dislike">
                                <img src="assests/images/icons/dislike.svg" alt="" class="comment-dislike-icon">
                                <div class="tooltip">Dislike</div>
                            </div>
                            <span class="reply" id = "reply${i.id}" onclick="showReplySection(this.id)">Reply</span>
                            </div>
                            <div class="add-reply" id = "add-reply-${i.id}">
                                <img src="assests/images/channel-images/unnamed.jpg" alt="" class="account-image-reply">
                                <div class="add-comment-right-section">
                                    <input type="text" class="input-reply" id = "input-reply-${i.id}" placeholder="Add a reply..." oninput="handleReplyButton(this.id)">
                                    <div class="reply-confirmation">
                                        <button class="cancel-reply-button" id = "cancel-reply-${i.id}" onClick="cancelReply(this.id)">Cancel</button>
                                        <button class="reply-button" id = "reply-button-${i.id}" onclick="addNewReply(this.id)">Reply</button>
                                    </div>
                                </div>
                            </div>
                            <div class="show-reply" id = "show-reply-${i.id}">
                            </div>
                    </div>

                    
        `
            }
            insertComment.innerHTML = addComment;
        })
    let topComment = document.querySelector(".top-comments");
    let newestFirst = document.querySelector(".newest-first")
    topComment.classList.add("active");
    newestFirst.classList.remove("active");
}
showComment();

//show comment cofirmation button for adding new comments
showCommentConfirmation = () => {
    let commentConfirmation = document.getElementsByClassName("comment-confirmation")[0];
    let commentButton = document.getElementsByClassName("comment-button")[0];
    commentConfirmation.classList.add("comment-confirmation_show");
    commentButton.disabled = true;
}

//enable and disable comment button
let handleCommentButton = () => {
    let commentButton = document.querySelector(".comment-button");
    let inputComment = document.querySelector(".input-comment");
    if (inputComment.value === "") {
        commentButton.disabled = true;
    } else {
        commentButton.disabled = false;
    }
}

//hide comment confirmation and clear input field when cancel button is pressed
let cancelComment = () => {
    let inputComment = document.querySelector(".input-comment");
    let commentConfirmation = document.getElementsByClassName("comment-confirmation")[0];
    inputComment.value = "";
    commentConfirmation.classList.remove("comment-confirmation_show");
}

//add new comment
let idToNewComment = 10;
let addNewComment = () => {
    let newComment = document.querySelector(".new-comment");
    let commentConfirmation = document.querySelector(".comment-confirmation");
    let inputComment = document.querySelector(".input-comment");
    idToNewComment++;
    let addComment = `
    <div class="comment-container" id = "comment-"${idToNewComment}>
                    <div class="comments">
                        <img src="./assests/images/channel-images/unnamed.jpg" alt="" class="comment-channel-img">
                        <div class="comment-channel-info">
                            <span class="comment-channel-name">@Nabin</span>
                            <span class="comment-channel-date">0 seconds ago</span>
                            <p class="display-comment">${inputComment.value}</p>
                        </div>
                    </div>
                    <div class="comment-like-dislike">
                        <div class="comment-like">
                            <img src="assests/images/icons/like.svg" alt="like" class="comment-like-icon">
                            <div class="tooltip">Like</div>
                        </div>
                        <span class="likes"></span>
                        <div class="comment-dislike">
                            <img src="assests/images/icons/dislike.svg" alt="" class="comment-dislike-icon">
                            <div class="tooltip">Dislike</div>
                        </div>
                        <span class="reply" id = "reply${idToNewComment}" onclick="showReplySection(this.id)">Reply</span>
                    </div>
                    <div class="add-reply" id = "add-reply-${idToNewComment}">
                        <img src="assests/images/channel-images/unnamed.jpg" alt="" class="account-image-reply">
                        <div class="add-comment-right-section">
                            <input type="text" class="input-reply" id = "input-reply-${idToNewComment}" placeholder="Add a reply..." oninput="handleReplyButton(this.id)">
                            <div class="reply-confirmation">
                                <button class="cancel-reply-button" id = "cancel-reply-${idToNewComment}" onClick="cancelReply(this.id)">Cancel</button>
                                <button class="reply-button" id = "reply-button-${idToNewComment}" onclick="addNewReply(this.id)">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div class="show-reply" id = "show-reply-${idToNewComment}">
                    </div>
    </div>
    `
    newComment.innerHTML += addComment;
    commentConfirmation.classList.remove("comment-confirmation_show");
    inputComment.value = "";
}


//show reply section to newly added comment
let showReplySection = (id) => {
    id = id.match(/(\d+)/)[0];
    let replySection = document.getElementById(`add-reply-${id}`);
    let replyButton = document.getElementById(`reply-button-${id}`);
    let inputReply = document.getElementById(`input-reply-${id}`);
    replySection.classList.add("add-reply_show");
    inputReply.focus();
    if (inputReply.value === "") {
        replyButton.disabled = true;
    }
}

//enable and disable reply button
let handleReplyButton = (id) => {
    id = id.match(/(\d+)/)[0];
    let replyButton = document.getElementById(`reply-button-${id}`);
    let inputReply = document.getElementById(`input-reply-${id}`);
    if (inputReply.value === "") {
        replyButton.disabled = true;
    } else {
        replyButton.disabled = false;
    }
}

//hide reply section and clear input field when cancel button is pressed
let cancelReply = (id) => {
    id = id.match(/(\d+)/)[0];
    let replySection = document.getElementById(`add-reply-${id}`);
    let inputReply = document.getElementById(`input-reply-${id}`);
    replySection.classList.remove("add-reply_show");
    inputReply.value = "";
}

//add reply
let addNewReply = (id) => {
    id = id.match(/(\d+)/)[0];
    let insertReply = document.getElementById(`show-reply-${id}`);
    let inputReply = document.getElementById(`input-reply-${id}`);
    let replySection = document.getElementById(`add-reply-${id}`);
    let addReply = `
    <div class="comment-container">
        <div class="reply-container">
                <div class="comments">
                    <img src="./assests/images/channel-images/unnamed.jpg" alt="" class="account-image-reply">
                    <div class="comment-channel-info">
                        <span class="comment-channel-name">@Nabin</span>
                        <span class="comment-channel-date">0 seconds ago</span>
                        <p class="display-comment">${inputReply.value}</p>
                    </div>
                </div>
                <div class="reply-like-dislike">
                    <div class="comment-like">
                        <img src="assests/images/icons/like.svg" alt="like" class="comment-like-icon">
                        <div class="tooltip">Like</div>
                    </div>
                    <span class="likes"></span>
                    <div class="comment-dislike">
                        <img src="assests/images/icons/dislike.svg" alt="" class="comment-dislike-icon">
                        <div class="tooltip">Dislike</div>
                    </div>
                    <span class="reply">Reply</span>
                </div>
        </div>
    </div>
    `
    insertReply.innerHTML += addReply;
    replySection.classList.remove("add-reply_show");
    inputReply.value = "";
}

//sorting comments based on time
let sortComments = () => {
    fetch("./assests/data/comments.json")
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((comment) => {
            comment.comments.sort(function (a, b) {
                return parseFloat(a.authorPostDate) - parseFloat(b.authorPostDate);
            });
            let addComment = '';
            let insertComment = document.getElementsByClassName("old-comment")[0];
            for (let i of comment.comments) {
                addComment += `
                        <div class="comment-container" id=${i.id}>
                                <div class="comments">
                                    <img src=${i.authorProfileImageUrl} alt="" class="comment-channel-img">
                                    <div class="comment-channel-info">
                                        <span class="comment-channel-name">${i.authorDisplayName}</span>
                                        <span class="comment-channel-date">${i.authorPostDate}</span>
                                        <p class="display-comment">${i.authorComment}</p>
                                    </div>
                                </div>
                                <div class="comment-like-dislike">
                                    <div class="comment-like">
                                        <img src="assests/images/icons/like.svg" alt="like" class="comment-like-icon">
                                        <div class="tooltip">Like</div>
                                    </div>
                                    <span class="likes">${i.authorCommentLikes}</span>
                                    <div class="comment-dislike">
                                        <img src="assests/images/icons/dislike.svg" alt="" class="comment-dislike-icon">
                                        <div class="tooltip">Dislike</div>
                                    </div>
                                    <span class="reply" id = "reply${i.id}" onclick="showReplySection(this.id)">Reply</span>
                            </div>
                            <div class="add-reply" id = "add-reply-${i.id}">
                                <img src="assests/images/channel-images/unnamed.jpg" alt="" class="account-image-reply">
                                <div class="add-comment-right-section">
                                    <input type="text" class="input-reply" id = "input-reply-${i.id}" placeholder="Add a reply..." oninput="handleReplyButton(this.id)">
                                    <div class="reply-confirmation">
                                        <button class="cancel-reply-button" id = "cancel-reply-${i.id}" onClick="cancelReply(this.id)">Cancel</button>
                                        <button class="reply-button" id = "reply-button-${i.id}" onclick="addNewReply(this.id)">Reply</button>
                                    </div>
                                </div>
                            </div>
                            <div class="show-reply" id = "show-reply-${i.id}">
                            </div>
                    </div>
        `
            }
            insertComment.innerHTML = addComment;
        })
}

//show sort option
let showSortOption = () => {
    let sortContainer = document.querySelector(".sort-container");
    sortContainer.classList.toggle("sort-container_show");
}

//sort by newest first
let sortByNew = () => {
    let topComment = document.querySelector(".top-comments");
    let newestFirst = document.querySelector(".newest-first");
    topComment.classList.remove("active");
    newestFirst.classList.add("active");
    sortComments();
}

//tag based filter of recommendation
let recommendAll = () => {
    let addRecommendtion = document.querySelector(".recommendation-container");
    addRecommendtion.innerHTML = `
            <article class="side-video-list" id="video1"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/rXtgCCGWrcE?autoplay=1&mute=0', 'Mind relaxing 2023 | ❤️Mashup (Slowed x Reverb)')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-1.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Mind relaxing 2023 | ❤️Mashup (Slowed x Reverb)</a>
                    <a href="#" class="channel-name">plo Lorin</a>
                    <a href="#" class="video-views">25k views &#183 1 months ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video2"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/Uc-a3D1RWhA?autoplay=1&mute=0', 'Romantic Non-stop lofi songs || [slow-reverb] ||')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-2.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title"> Romantic Non-stop lofi songs || [slow-reverb] ||</a>
                    <a href="#" class="channel-name">Phil Foden</a>
                    <a href="#" class="video-views">255k views &#183 3 years ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video3"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/MKbis1d15yQ?autoplay=1&mute=0','Aranmanai 3 (2023) New Released Hindi Dubbed Movie | Arya, Sundar C, Raashii Khanna, Andrea Jeremiah')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-3.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Aranmanai 3 (2023) New Released Hindi Dubbed Movie | Arya,
                        Sundar C,
                        Raashii Khanna, Andrea Jeremiah</a>
                    <a href="#" class="channel-name">Nameless</a>
                    <a href="#" class="video-views">255k views &#183 3 days ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video4"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/rXtgCCGWrcE?autoplay=1&mute=0', 'I discovered this song from tik tok I instantly paused and went to YouTube.')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-4.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">I discovered this song from tik tok I instantly paused and went
                        to
                        YouTube.</a>
                    <a href="#" class="channel-name">Heary</a>
                    <a href="#" class="video-views">55k views &#183 4 months ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video5"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'I instantly paused and went to YouTube. Hour Seamless Loopahs1')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-5.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title"> I instantly paused and went to YouTube. Hour Seamless Loopahs1
                        Hour Seamless Loopahsa</a>
                    <a href="#" class="channel-name">Emil L</a>
                    <a href="#" class="video-views">255k views &#183 3 years ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video6"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/rXtgCCGWrcE?autoplay=1&mute=0', 'Jacob and I discovered this song from tik tok I instantly paused and went to YouTube.')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-2.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Jacob and I discovered this song from tik tok I instantly paused
                        and
                        went to YouTube.</a>
                    <a href="#" class="channel-name">Emil Lorin</a>
                    <a href="#" class="video-views">255k views &#183 3 days ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video7"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'Stone song from tik tok went to YouTube. 1 Hour Seamless Loop')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-8.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Stone song from tik tok went to YouTube. 1 Hour Seamless
                        Loop</a>
                    <a href="#" class="channel-name">Emil Lorin</a>
                    <a href="#" class="video-views">255k views &#183 7 months ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video8"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'Jacob and the Stone | 1 Hour Seamless Loop')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-9.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Jacob and the Stone | 1 Hour Seamless Loop</a>
                    <a href="#" class="channel-name">Emil Lorin</a>
                    <a href="#" class="video-views">255k views &#183 3 months ago </a>
                </div>
            </article>
        `
        document.querySelector(".recommend-all").classList.add("activated");
        document.querySelector(".recommend-same").classList.remove("activated");
        document.querySelector(".recommend-related").classList.remove("activated");
}

let recommendSame = () => {
    let addRecommendtion = document.querySelector(".recommendation-container");
    addRecommendtion.innerHTML = `
            <article class="side-video-list" id="video6"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/rXtgCCGWrcE?autoplay=1&mute=0', 'Jacob and I discovered this song from tik tok I instantly paused and went to YouTube.')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-2.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Jacob and I discovered this song from tik tok I instantly paused
                        and
                        went to YouTube.</a>
                    <a href="#" class="channel-name">Emil Mosseri</a>
                    <a href="#" class="video-views">255k views &#183 3 days ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video7"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'Stone song from tik tok went to YouTube. 1 Hour Seamless Loop')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-8.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Stone song from tik tok went to YouTube. 1 Hour Seamless
                        Loop</a>
                    <a href="#" class="channel-name">Emil Mosseri</a>
                    <a href="#" class="video-views">255k views &#183 7 months ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video8"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'Jacob and the Stone | 1 Hour Seamless Loop')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-9.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Jacob and the Stone | 1 Hour Seamless Loop</a>
                    <a href="#" class="channel-name">Emil Mosseri</a>
                    <a href="#" class="video-views">255k views &#183 3 months ago </a>
                </div>
            </article>
        `
        document.querySelector(".recommend-all").classList.remove("activated");
        document.querySelector(".recommend-same").classList.add("activated");
        document.querySelector(".recommend-related").classList.remove("activated");
}

let recommendRelated = () => {
    let addRecommendtion = document.querySelector(".recommendation-container");
    addRecommendtion.innerHTML = `
            <article class="side-video-list" id="video3"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/MKbis1d15yQ?autoplay=1&mute=0','Aranmanai 3 (2023) New Released Hindi Dubbed Movie | Arya, Sundar C, Raashii Khanna, Andrea Jeremiah')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-3.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Aranmanai 3 (2023) New Released Hindi Dubbed Movie | Arya,
                        Sundar C,
                        Raashii Khanna, Andrea Jeremiah</a>
                    <a href="#" class="channel-name">Nameless</a>
                    <a href="#" class="video-views">255k views &#183 3 days ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video4"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/rXtgCCGWrcE?autoplay=1&mute=0', 'I discovered this song from tik tok I instantly paused and went to YouTube.')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-4.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">I discovered this song from tik tok I instantly paused and went
                        to
                        YouTube.</a>
                    <a href="#" class="channel-name">Heary</a>
                    <a href="#" class="video-views">55k views &#183 4 months ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video5"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'I instantly paused and went to YouTube. Hour Seamless Loopahs1')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-5.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title"> I instantly paused and went to YouTube. Hour Seamless Loopahs1
                        Hour Seamless Loopahsa</a>
                    <a href="#" class="channel-name">Emil L</a>
                    <a href="#" class="video-views">255k views &#183 3 years ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video6"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/rXtgCCGWrcE?autoplay=1&mute=0', 'Jacob and I discovered this song from tik tok I instantly paused and went to YouTube.')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-2.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Jacob and I discovered this song from tik tok I instantly paused
                        and
                        went to YouTube.</a>
                    <a href="#" class="channel-name">Emil Lorin</a>
                    <a href="#" class="video-views">255k views &#183 3 days ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video7"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'Stone song from tik tok went to YouTube. 1 Hour Seamless Loop')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-8.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Stone song from tik tok went to YouTube. 1 Hour Seamless
                        Loop</a>
                    <a href="#" class="channel-name">Emil Lorin</a>
                    <a href="#" class="video-views">255k views &#183 7 months ago </a>
                </div>
            </article>
            <article class="side-video-list" id="video8"
                onclick="playRecommendedVideo('https://www.youtube.com/embed/-I12_W7UHh0?autoplay=1&mute=0', 'Jacob and the Stone | 1 Hour Seamless Loop')">
                <a href="#" class="thumbnail">
                    <img src="assests/images/thumbnails/thumbnail-9.webp" alt="thumbnail">
                </a>
                <div class="video-info">
                    <a href="#" class="video-title">Jacob and the Stone | 1 Hour Seamless Loop</a>
                    <a href="#" class="channel-name">Emil Lorin</a>
                    <a href="#" class="video-views">255k views &#183 3 months ago </a>
                </div>
            </article>
        `
        document.querySelector(".recommend-all").classList.remove("activated");
        document.querySelector(".recommend-same").classList.remove("activated");
        document.querySelector(".recommend-related").classList.add("activated");
}




