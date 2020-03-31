var WINDOW_WIDTH = 1024;//定义画布的宽度
var WINDOW_HEIGHT = 768;//定义画布的长度
var RADIUS = 8;//定义每个小球的半径
var MARGIN_LEFT = 30;//定义画布位置
var MARGIN_TOP = 60;//定义画布位置

const endTime = new Date();//定义截止时间，数据类型为Date  注2
endTime.setTime(endTime.getTime() + 3600*1000);//倒计时时间设定为一个小时
var curShowTimeSeconds = 0;

var balls = [];//用于装掉落小球的数组

const colors = ["#FFCCFF", "#FF00FF", "#FF6600", "CCOOFF", "#FFCC00", "#CC0000", "#66CCFF", "#66CC33", "CCFF00"];//掉落小球的颜色库

window.onload = function () {

    var canvas = document.getElementById("canvas"); //Dom操作获取到html中的canvas元素
    var context = canvas.getContext("2d");  //设定绘图环境

    window.onresize = function () { change(); } //实现倒计时效果适应各种窗口大小   注4
    change();

    curShowTimeSeconds = getCurrentShowTimeSeconds();//获取到倒计时的秒数
    setInterval(
        function () {
            render(context); //绘制小球的函数
            update();//实现小球掉落，滚动
        }
        ,
        50
    )//每50毫秒调用一次render和update函数    注5

}//   注3


function change() {
    WINDOW_WIDTH = document.documentElement.clientWidth || document.body.clientWidth; //获取当前页面的宽度
    WINDOW_HEIGHT = document.documentElement.clientHeight || document.body.clientHeight;//获取当前页面的高度

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10); //设定左边距为当前页面宽度的十分之一
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1; 
    //设定小球半径，左边距右边距各占十分之一，则倒计时内容占五分之四，/108见render函数中的注释，求出每个小球所在列宽度后，再减一，让小球不占满每一个列的所有宽度，相当于给各个列之间添加空隙
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);//设定倒计时效果距顶部为五分之一的高度
    canvas.width = WINDOW_WIDTH; //定义画布宽度
    canvas.height = WINDOW_HEIGHT;//定义画布高度
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date(); //curTime为当前的时间
    var ret = endTime.getTime() - curTime.getTime();//ret中为倒计时的 毫秒 数
    ret = Math.round(ret / 1000); //转换为 秒

    return ret >= 0 ? ret : 0;//若倒计时结束则返回0
}


function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);//刷新画布，cxt为传入的绘图环境   注6

    var hours = parseInt(curShowTimeSeconds / 3600);//设定小时，curShowTimeSeconds为倒计时的秒数，除3600后取整为小时数
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);//设定分钟
    var seconds = curShowTimeSeconds % 60;//设定秒

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);//绘制小时的十位数的数字的，第一个参数为每个数字的左边距，每个数字不同；第二个参数为每个数字距顶部的距离，每个数字相同；第三个参数为要用小球绘制的数字，要绘制小时的十位数上的数字，则把小时数除10后取整数；最后一个参数为绘图环境
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);//绘制小时的个位数的数字，在digit.js中设置了数组来表示每一个数组，一个数字的宽度有7列小球，一列小球的宽度为2*（半径+1），7*2*（半径+1）,为了各个数字间留有空隙，变为15*（半径+1）
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);//绘制冒号，左边距多加一个数字的距离，多加15*（半径+1）

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);//绘制分钟的十位数数字，digit.js中冒号有四列，左边距则要多加9*（半径+1）
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);//绘制分钟的个位数数字，左边距多加15*（半径+1）
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);//绘制冒号，54+15

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);//绘制秒数的十位数数字，69+9
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);//绘制秒数的个位数数字，78+15

    //93+15 = 108 则Math.round(WINDOW_WIDTH * 4 / 5 / 108)求出每列的（半径+1），再减1后得到半径RADIUS

    for (var i = 0; i < balls.length; i++) { //balls中装着滚动掉落的小球，遍历并绘制每个小球
        cxt.fillStyle = balls[i].color;//添加绘图的颜色

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);//画圆  注7
        cxt.closePath();

        cxt.fill();//绘图填充

    }

}


function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";//设置绘制倒计时数字的小球颜色

    for (var i = 0; i < digit[num].length; i++) 
        for (var j = 0; j < digit[num][i].length; j++)//双层循环，逐步绘制每一个小球

            if (digit[num][i][j] == 1) {  //digit.js设置的数组中数值为1的地方画圆，为0的地方不画
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);//画圆
                cxt.closePath();

                cxt.fill();//绘图填充
            }



}


function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();//获取到当前时刻最新的倒计时秒数

    var nextHours = parseInt(nextShowTimeSeconds / 3600);//当前小时数
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);//当前分钟数
    var nextSeconds = nextShowTimeSeconds % 60;//当前秒数

    var curHours = parseInt(curShowTimeSeconds / 3600);//已经绘制完成的小时数
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);//已经绘制完成的分钟数
    var curSeconds = curShowTimeSeconds % 60;//已经绘制完成的秒数

    if (nextSeconds != curSeconds) { //当前时间与绘制完成后的时间不同，则添加小球到balls数组中，具体实现为addBalls函数
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nextHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours / 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }
        //addBalls()函数第一个参数为左边距，第二个为上边距，第三个为具体要绘制的数字

        curShowTimeSeconds = nextShowTimeSeconds;//添加小球到balls完成后将当前时间的值赋予绘制时完成的时间，以便下一次的调用。
    }

    updateBalls();//设定小球下落的物理模型，并清除已经离开屏幕的小球

}


function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)   //两层循环，遍历到每一个小球
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(), //每个小球的加速度略微不同
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, //水平方向上的速度随机为-4或4
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]  //在颜色库中随机选择一种颜色
                }

                balls.push(aBall);//将小球装入balls中
            }
}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {  //改变小球的位置和速度
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

        //清除过多的小球，以防止随着时间的累积生成过多的小球，影响系统的性能
    var cnt = 0;

    for (var i = 0; i < balls.length; i++)
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
            balls[cnt++] = balls[i];

    while (balls.length > Math.min(300, cnt)) {  
        balls.pop();
    }

}


