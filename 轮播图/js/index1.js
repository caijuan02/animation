//获取标签
var aleft = document.getElementById('aleft');
var aright = document.getElementById('aright');
//获取切换元素
var ileft = document.getElementById('ileft');
var iright = document.getElementById('iright');

var container = document.getElementById('container');
var text1 = document.getElementById('text1');
var text2 = document.getElementById('text2');

//获取大图的元素
var big = document.getElementById('big');
var ali1 = big.getElementsByTagName("li");
var aimageL = [];
for (var j = 0; j < ali1.length; j++) {
    aimageL.push(ali1[j].getElementsByTagName("img")[0]);
}

//获取小图的元素
var small = document.getElementById('small');
var ali2 = small.getElementsByTagName("li");
var aimageR = [];
for (var l = 0; l < ali2.length; l++) {
    aimageR.push(ali2[l].getElementsByTagName("img")[0]);
}
//
var smallUl = small.getElementsByTagName("ul")[0];
smallUl.style.width = ali2[0].offsetWidth * ali2.length + "px";


//定义一个全局变量now         当前选中的图片下小图片透明度不变为1
//定义一个全局变量nowZIndex   改变z-index
var now = 0;
var nowZIndex = 2;


//第一个功能  鼠标滑上区域时左右切换出现
ileft.onmouseover = aleft.onmouseover = function () {
    move(ileft, 100, "opacity");
};
ileft.onmouseout = aleft.onmouseout = function () {
    move(ileft, 0, "opacity");
};
iright.onmouseover = aright.onmouseover = function () {
    move(iright, 100, "opacity");

};
iright.onmouseout = aright.onmouseout = function () {
    move(iright, 0, "opacity");

};

//鼠标滑入滑出时下面小图片透明度变化  点击时上面出现对应的大图
for (var q = 0; q < ali2.length; q++) {
    ali2[q].index = q;
    ali2[q].onmouseover = function () {
        if (this.index == now) {
            return;
        } else {
            move(this, 100, "opacity");
        }
    };
    ali2[q].onmouseout = function () {
        if (this.index == now) {
            return;
        } else {
            move(this, 50, "opacity");
        }
    };
    ali2[q].onclick = function () {
        if (now == this.index) {
            return;
        } else {
            now = this.index;
            tab();
        }
    }

}
//点击切换按钮功能
ileft.onclick = function () {
    if (now == 0) {
        now = ali2.length;
    }
    now--;
    tab();
};
iright.onclick = function () {
    if (now == ali2.length - 1) {
        now = -1;
    }
    now++;
    tab();
};
function tab() {
    for (var j = 0; j < ali2.length; j++) {
        move(ali2[j], 50, "opacity");
    }
    move(ali2[now], 100, "opacity");
    aimageL[now].style.zIndex = nowZIndex++;
    aimageL[now].style.height = 0;
    move(aimageL[now], 320, "height");

    if (now == 0) {
        move(smallUl, -(ali2[0].offsetWidth * (now)), "left");
    } else if (now == ali2.length - 1) {
        move(smallUl, -(ali2[0].offsetWidth * (now - 2)), "left");
    } else {//点击一下，整个ul应该向左移动一个li的宽度
        move(smallUl, -(ali2[0].offsetWidth * (now - 1)), "left");
    }
    //添加文字说明
    text1.innerHTML = aimageL[now].alt;
    text2.innerHTML = (now + 1) + "/" + aimageL.length;
}

//自动切换功能
var timer = setInterval(function () {
    iright.onclick();
}, 3000);

//鼠标滑入滑出功能
container.onmouseover = function () {
    clearInterval(timer);
};
container.onmouseout = function () {
    timer = setInterval(function () {
        iright.onclick();
    }, 3000)
};
