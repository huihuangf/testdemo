/**
 * Created by hhfly on 2018/6/27.
 */

window.onload=function () {
    waterfall('main','pin');
}
function waterfall(parent,pin) {
    var oParent=document.getElementById(parent);
    var aPin=getClassObj(oParent,pin);
    //找到一个pin快的宽度，因为都是一样的
    //offsetWidth包含一个块的宽度
    var ipinW=aPin[0].offsetWidth;
    //计算每一行有几个pin
    var num=Math.floor(document.documentElement.clientWidth/ipinW);
    //设置父级居中样式：定宽+自动水平外边距
    oParent.style.cssText="width:"+ipinW*num+"px;margin:0 auto;";
    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<aPin.length;i++){
        //取出pin的高度
        var pinH=aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i]=pinH;
        }else{
            //求出数组中最小的值
            var minH=Math.min.apply(null,pinHArr);
            var minHindex=getMinHindex(pinHArr,minH);
            aPin[i].style.position='absolute';
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHindex].offsetLeft+"px";
            pinHArr[minHindex]+=aPin[i].offsetHeight;

        }
    }


}
//获取pin中高度最小值的索引index
function getMinHindex(arr,minH) {
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
function getClassObj(oParent,pin) {
    //获取父级下的所有元素
    var obj=oParent.getElementsByTagName('*');
    var pins=[];
    for(var i=0;i<obj.length;i++){
        if (obj[i].className==pin){
            pins.push(obj[i]);
        }
    }
    return pins;
    
}