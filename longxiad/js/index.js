var log = console.log.bind(console);

var bannerImg = document.querySelectorAll(".banner li");
var asidebtn = document.querySelectorAll("aside .btn");

var clearCurrent = function () {
    for (var i = asidebtn.length - 1; i >= 0; i--) {
        asidebtn[i].parentNode.classList.remove("current");
        bannerImg[i].classList.remove("current");
    }
}

for (var i = asidebtn.length - 1; i >= 0; i--) {
    // 闭包问题给对象添加变量解决或者用let i
    asidebtn[i].index = i;
    asidebtn[i].addEventListener("mouseover", function () {
        clearCurrent();
        this.parentNode.classList.add("current");
        bannerImg[this.index].classList.add("current");
    })
}