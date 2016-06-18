/**
 * Created by ls on 2016/2/15.
 */
window.onload=function (){
    waterfall('main','pin');
    var dataInt={"data":[{"src":"P_00.jpg"},{"src":"P_01.jpg"},{"src":"P_02.jpg"},{"src":"P_03.jpg"},
        {"src":"P_04.jpg"},{"src":"P_05.jpg"},{"src":"P_06.jpg"},{"src":"P_07.jpg"}
    ]};
    window.onscroll=function(){
        if(checkscrollside()){
            var oParent=document.getElementById('main');
            //将数据块渲染到页面的尾部
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement('div');
                oPin.className='pin';
                oParent.appendChild(oPin);
                var oBox=document.createElement('div');
                oBox.className='box';
                oPin.appendChild(oBox);
                var oImg=document.createElement('img');
                oImg.src="./images/"+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('main','pin');
        }
    }

}
function  waterfall(parent,pin){
    //将main下的所有class为box的元素取出来
    var oParent=document.getElementById(parent),
        oBoxs=getByClass(oParent,pin);
    //console.log(oBoxs.length);

    //计算整个页面显示的列数(页面宽/box的宽)
    var oBoxW=oBoxs[1].offsetWidth;
    //console.log(oBoxW);  //202=165+10*2+1*2+15,,,,,,通过offsetWidth获取元素的宽度
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    //console.log(document.documentElement.clientWidth)
    //console.log(cols);

    //设置main的宽和居中
    oParent.style.cssText='width:'+oBoxW*cols+'px;'+'margin:0 auto';
    //console.log(oParent.offsetWidth)


    var harr=[]; //存放每一列图片的高度的数组
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            harr.push(oBoxs[i].offsetHeight);
        }else{
            var minh=Math.min.apply(null,harr);//找到harr中的最小值
            //console.log(minh);
            var minhindex=getminHIndex(harr,minh);
            //console.log(minhindex)
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minh+'px';
            //oBoxs[i].style.left=oBoxW*minhindex+'px';
            oBoxs[i].style.left=oBoxs[minhindex].offsetLeft+'px';

            //************将第二行第一个元素的位置设置在第一行最小高度的元素下后，将最小高度元素的高度重新设置
            harr[minhindex]+=oBoxs[i].offsetHeight;
        }
    }
    //console.log(harr);


}
function getByClass(parent,clsname){
    var boxarr=new Array(),//用来存储获取到的所有 class为box 的元素
        oElements=parent.getElementsByTagName('*');
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsname){
            boxarr.push(oElements[i]);
        }
    }
    return boxarr;
}
function getminHIndex(arr,minval){
    for(var i in arr){
        if(arr[i]==minval){
            return i;
        }
    }

}
//检测是否可以加载数据块
function checkscrollside(){
    var oParent=document.getElementById('main');
    var oBoxs=getByClass(oParent,'pin');
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+
       Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2 )  ;
    var scorlltop=document.body.scrollTop||document.documentElement.scrollTop;//兼容  混杂模式与标准模式
    var height=document.body.clientHeight||document.documentElement.clientHeight;//兼容  混杂模式与标准模式
    console.log(scorlltop);
    console.log(height);
    console.log(lastBoxH);
    return(scorlltop+height>lastBoxH)?true:false;


}