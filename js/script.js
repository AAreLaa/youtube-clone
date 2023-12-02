// for every click event
window.onclick = (event) => {
    searchRecommendation();
    openCloseUploadModal(event.target.closest(".upload-modal"), event.target.closest(".header__upload-icon-button"));
    openCloseNotificationModal(event.target.closest(".notification-modal"), event.target.closest(".header__bell-icon-button"));

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
    if (!likeButton.classList.contains("content-like_active") ) {
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
    if (likeButton.classList.contains("content-like_active") ){
        likeCount.innerHTML = parseFloat(likeCount.innerText) - 1 + 'k';
        likeButton.classList.remove("content-like_active");
    }
   
}

//copy youtube link from share modal

const copyToClipboard = () =>{
    let copy = document.getElementById("youtube-link").innerText;
    let notification = document.getElementsByClassName("copied-notification")[0];
    notification.style.display = "block"
    navigator.clipboard.writeText(copy);
    setTimeout((()=>{
        notification.style.display = "none";
    }), 2000)

}

