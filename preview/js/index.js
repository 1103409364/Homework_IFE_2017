var ulist = document.querySelector(".objlist ul");


function slideToggle(e) {
    let target = e.target;

    // 如果点击中的节点含有href属性，不阻止默认事件
    if(!target.href) {
        e.preventDefault();
    }

    target.classList.toggle("down");
}

function isMobile() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) return true;

    return false;
}

if (isMobile()) {
    ulist.addEventListener("touchstart", slideToggle);
} else {
    ulist.addEventListener("click", slideToggle);
}