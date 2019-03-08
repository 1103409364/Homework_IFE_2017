//得到运动机构
var newUl = document.getElementById("newUl");
//得到li
var newLi = newUl.getElementsByTagName("li");
//复制节点前新闻数量
var newLength = newLi.length;
//一条新闻高度
var height = 40;
//滚动速度
var animateTime = 600;
//缓冲描述
var tween = "BounceEaseOut";
//自动轮播间隔时间
var interval = 2000;
// 信号量
var nowIndex = 0; //0 1 2 3 4 5 6 。6是临时状态
// 复制一条新闻到末尾
newUl.appendChild(newLi[0].cloneNode(true));

setInterval(function() {
    // 函数节流，isanimated属性在运动框架里添加
    if(newUl.isanimated) return;

    nowIndex++;
    if(nowIndex > newLength) {
        // 从假0切换回真0时候，应该立即往下移动，让nowIndex = 1,否则会有停顿感，
        // 拉回0，立即下移
        newUl.style.top = 0;
        nowIndex = 1;
    }

    animate(newUl, { "top": -height * nowIndex }, animateTime, tween);
}, interval);



