var wrap = document.getElementById('wrap');
//取切换按钮元素
var previous = document.getElementById('previous');
var next = document.getElementById('next');

//取左右区域元素
var left = document.getElementById('left');
var right = document.getElementById('right');

//滑入滑出区域时切换按钮出现

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

//定义全局变量
var now = 0;

//取包含图片的li
var ulImg = document.getElementById('ul-img');
var liImg = ulImg.getElementsByTagName('li');

//取下面圆的li
var ulCircle = document.getElementById('ul-circle');
var liCircle = ulCircle.getElementsByTagName('li');

for(var i =0;i<liCircle.length;i++){
    liCircle[i].index = i;
    liCircle[i].onmouseover = function(){
        //console.log(this.index);
        if(this.index == now){
            return;
        } else{
            now = this.index;
            hcmove(ulImg,{'left' : -(liImg[0].offsetWidth * now)});
        }
    }
}

//点击切换按钮实现图片切换
previous.onclick = function(){
    if(now == 0){
        now = liImg.length;
    }
    now --;
    hcmove(ulImg,{'left' : -(liImg[0].offsetWidth * now)});
};
next.onclick =function(){


    if(now == liImg.length-1){
        now = -1;
    }
    now ++;
    hcmove(ulImg,{'left' : -(liImg[0].offsetWidth * now)});
};
var timer;
timer = setInterval(function(){
    next.onclick();
},3000);
wrap.onmouseover = function(){
    clearInterval(timer);
};
wrap.onmouseout = function(){
    timer = setInterval(function(){
        next.onclick();
    },3000)
};