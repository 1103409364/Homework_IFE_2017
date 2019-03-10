//得到carousel
var carousel = document.getElementById("carousel");
//得到运动机构
var m_unit = document.getElementById("m_unit");
//得到ul
var m_unitUl = m_unit.getElementsByTagName("ul")[0];
var m_unitLi = m_unitUl.getElementsByTagName("li");
//得到图片li
var lis = m_unit.getElementsByTagName("li");
// 获取按钮
var rightBtn = document.getElementById("rightBtn");
var leftBtn = document.getElementById("leftBtn");
//得到小圆点
var circleSliderLi = document.getElementById("circleNav").getElementsByTagName("li");
//复制节点前图片数量，真实数量
var imgLength = lis.length;
//图片宽度
var width = 665;
//滚动速度
var animateTime = 600;
//缓冲描述
var tween = "BounceEaseOut";
//自动轮播间隔时间
var interval = 2000;
// 信号量
var nowIndex = 0; //0 1 2 3 4 5 6 。6是临时状态

//把0号li克隆，然后插入到图片ul的最后面
m_unitUl.appendChild(m_unitLi[0].cloneNode(true));

// 右按钮事件
rightBtn.onclick = rightBtnHandler;
//自动轮播
var timer = setInterval(rightBtnHandler,interval);
//鼠标进入停止
carousel.onmouseover = function(){
    clearInterval(timer);
}
//鼠标离开开始
carousel.onmouseout = function(){
    timer = setInterval(rightBtnHandler,interval);
}

//右按钮的事件处理程序
function rightBtnHandler() {
    //点击右按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
    if(m_unit.isanimated) return;

    nowIndex++;
    changeCircle();
    animate(m_unit, { "left": -width * nowIndex }, animateTime, tween, function () {
        //回调函数，就是动画执行完毕之后做的事情
        if (nowIndex > imgLength - 1) {
            nowIndex = 0;
            // 拉回0
            this.style.left = "0px";
        }
    });
}

// 左按钮事件
leftBtn.onclick = leftBtnHandler;

function leftBtnHandler() {
    //点击按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
    if(m_unit.isanimated) return;
    
    // 左按钮业务
    nowIndex--;
    if(nowIndex < 0){
        nowIndex = imgLength - 1;
        // 第0张图片向左移时，拉到最后一张
        m_unit.style.left = -width * imgLength + "px";
    }

    animate(m_unit, { "left": -width * nowIndex }, animateTime, tween);
    changeCircle();
}


for(var i = 0; i < imgLength; i++) {
    // 小圆点业务IIFE写法
    // (function(i) {
    // 	circleSliderLi[i].onclick = function() {
    // 		//点击右按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
    // 		if(m_unit.isanimated) return;

    // 		// 小圆点的点击业务
    // 		nowIndex = i;
    // 		animate(m_unit, { "left": -width * nowIndex }, animateTime, tween);
    // 		changeCircle();
    // 	}
    // })(i)

    // 小圆点业务添加对象属性写法
    circleSliderLi[i].index = i;	//先编号
    circleSliderLi[i].onclick = function(){
        //点击小圆点的时候，运动机构本身在运动，就不让右按钮有任何作用
        if(m_unit.isanimated) return;
        
        //小圆点的点击业务
        nowIndex = this.index;
        animate(m_unit,{"left":-width * nowIndex},animateTime,tween);
        changeCircle();
    }
}

//更换小圆点函数
function changeCircle(){
    //n就是信号量的副本
    // var n = nowIndex % imgLength;
    // 三元运算写法
    var n = nowIndex == imgLength ? 0 : nowIndex;
    //判断副本的值==imgLength，那么就是0

    for (let i = 0; i < circleSliderLi.length; i++) {
        //去掉所有小圆点的cur
        circleSliderLi[i].classList.remove("current");
    }

    //第信号量这个小圆点加cur
    circleSliderLi[n].classList.add("current");
}