var wrap = document.getElementById('wrap');
//取点击切换按钮
var previous = document.getElementById('previous');
var next = document.getElementById('next');
//去左右滑上滑出区域
var left = document.getElementById('left');
var right = document.getElementById('right');

//鼠标滑入滑出点击切换按钮出现消失
previous.onmouseover = left.onmouseover = function(){
    hcmove(previous,{'opacity' : '100'});
};
next.onmouseover = right.onmouseover = function(){
    hcmove(next,{'opacity' : '100'});
};
previous.onmouseout = left.onmouseout = function(){
    hcmove(previous,{'opacity' : '0'});
};
next.onmouseout = right.onmouseout = function(){
    hcmove(next,{'opacity' : '0'});
};


//定义一个全局变量 存放当前显示图片的序号
var now = 0;
//获取下面圆的元素
var ulCircle = document.getElementById('ul-circle');
var liCircle = ulCircle.getElementsByTagName('li');
//获取上面图片
var ulImg = document.getElementById('ul-img');
var liImg = ulImg.getElementsByTagName('li');

for(var i=0;i<liCircle.length;i++){
    //自定义一个属性
    liCircle[i].index = i;
    liCircle[i].onmouseover = function(){
        console.log('111');
        if(now == this.index){
            return;
        } else{
            now = this.index;
            for(var j=0;j<liImg.length;j++){
                hcmove(liImg[j],{'opacity' : '0'});
            }
            hcmove(liImg[now],{'opacity' : '100'});
        }
    }
}
//点击切换按钮
previous.onclick = function(){
    if(now == 0){
        now = liImg.length;
    }
    now --;
    for(var i=0;i<liImg.length;i++){
        hcmove(liImg[i],{'opacity' : '0'});
    }
    hcmove(liImg[now],{'opacity' : '100'});
};
next.onclick = function(){
    if(now == liImg.length -1){
        now = -1;
    }
    now ++;
    for(var j=0;j<liImg.length;j++){
        hcmove(liImg[j],{'opacity' : '0'});
    }
    hcmove(liImg[now],{'opacity' : '100'});
};
//自动变化
var timer;
timer = setInterval(function(){
    next.onclick();
},3000);
//鼠标滑入时计时停止
wrap.onmouseover = function(){
    clearInterval(timer);
};
wrap.onmouseout = function(){
    timer = setInterval(function(){
        next.onclick();
    },3000)
};
