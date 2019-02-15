var log = console.log.bind(console);

var tabs = document.getElementById("tabs").getElementsByTagName("li");
var lists = document.getElementById("lists").getElementsByTagName("ul");
var seckillNav = document.getElementById("seckillNav");

// 切换商品面板
var showlist = function () {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i] === this) {
            tabs[i].className = "active";
            lists[i].classList.add("active");
        } else {
            tabs[i].className = "";
            lists[i].classList.remove("active");
        }
    }
}
// 页面滚动距离超过262px时，固定nav的位置
var navfixed = function () {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
    if (scrollTop >= 262) {
        seckillNav.classList.add("seckill-navfixed");
    } else {
        seckillNav.classList.remove("seckill-navfixed");
    }
}


// 添加事件
var addEvent = function () {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = showlist;
    }

    window.onscroll = navfixed;

    var cart = document.querySelector(".topbar-cart a"),
        searchBar = document.querySelector(".header-search");
}

// nav上的倒计时

//时间小于10补0
var checkTime = function (t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}

var setBtnText = function (txt) {
    var activeSeckillBtn = document.querySelectorAll(".active .btn");
    for (let i = 0; i < activeSeckillBtn.length; i++) {
        if (txt === "已结束") {
            activeSeckillBtn[i].classList.add("end");
        }
        if (txt === "登陆后抢购" || txt === "立即抢购") {
            activeSeckillBtn[i].classList.add("toSeckill");
        }
        activeSeckillBtn[i].innerHTML = txt;

    }
}
// 倒计时
var countdown = function () {
    var countdownEle = document.querySelector(".countdown");
    // 抢购时长
    var mins = 55 * 60 * 1000;

    var today = new Date(),
        y = today.getFullYear(),
        m = today.getMonth(),
        d = today.getDate(),
        h = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    var seckillTime = document.querySelector(".seckill-time").textContent;
    seckillTime = parseInt(seckillTime);

    //结束时间
    var stopTime = new Date(y, m, d, seckillTime, 0, 0, 0),
        stopH = stopTime.getHours(),
        stopM = stopTime.getMinutes(),
        stopS = stopTime.getSeconds();
    // 剩余时间
    var surplusTime = stopTime.getTime() - today.getTime(),
        surplusH = Math.floor(surplusTime / (3600 * 1000)),
        surplusMin = Math.floor(surplusTime % (3600 * 1000) / (60 * 1000)),
        surplusSec = Math.floor((surplusTime - surplusH * 3600 * 1000 - surplusMin * 60 * 1000) / 1000);

    if (surplusTime <= 0 && Math.abs(surplusTime) <= mins) {
        if (countdownEle) {
            countdownEle.parentElement.innerHTML = "抢购中";
            setBtnText("登陆后抢购");
        }
    } else if (surplusTime <= 0 && Math.abs(surplusTime) > mins) {
        if (countdownEle) {
            countdownEle.parentElement.innerHTML = "抢购已结束";
            setBtnText("已结束");
        }
    } else {
        var countdownText = "距开始" + " " + checkTime(surplusH) + ":" + checkTime(surplusMin) + ":" + checkTime(surplusSec);
        countdownEle.innerHTML = countdownText;
    }
}

var __main = function () {
    addEvent();

    // 页面加载时，立即运行一次倒计时
    countdown();

    setInterval(function () {
        countdown();
    }, 500);
}

__main();
