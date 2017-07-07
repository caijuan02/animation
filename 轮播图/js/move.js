//获取样式
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    } else{
        return window.getComputedStyle(obj,null)[attr];
    }
}
//运动框架
function move(obj,iTarget,attr){
    clearInterval(obj.timer);
    var speed = 0;
    obj.timer = setInterval(function(){
        //判断改变的是透明度还是其他样式
        var curr = 0;
        if(attr == "opacity"){ //透明度
            curr = Math.round(parseFloat(getStyle(obj,"opacity"))*100);
        } else{
            curr = parseInt(getStyle(obj,attr));
        }
        //速度
        speed = (iTarget - curr) /5;
        speed = speed>0?Math.ceil(speed):Math.floor(speed);
        //何时清除定时器
        if(curr == iTarget){
            clearInterval(obj.timer);
        } else{
            //如果改变的是透明度
            if(attr == "opacity"){
                curr += speed;
                obj.style.opacity = curr/100;
                obj.style.filter = "alpha(opacity:" + curr + ")";
            } else{ //改变的是其他样式
                obj.style[attr] = curr + speed + "px";
            }
        }
    },30)
}