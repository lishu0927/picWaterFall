/**
 * Created by ls on 2016/2/15.
 */
$( window ).on( "load", function(){
    waterfall('main','pin');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    $(window).on('scroll',function(){
        if(checkscrollside){
            $.each( dataInt.data, function( key, value ){
                //jquery创建div，$('<div>'),jquery两大有点：连缀，隐式迭代
                var oPin = $('<div>').addClass('pin').appendTo( $( "#main" ) );
                var oBox = $('<div>').addClass('box').appendTo($(oPin) );
                console.log(value)
                //创建img并设置img的src
                $('<img>').attr('src','./image/' + $(value).attr( 'src') ).appendTo($(oBox));
            });
            waterfall('main','pin');
        };
    })
});

/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent,pin){
    var $aPin = $( "#main>div" );
    //width()仅仅是宽，outerwidth（）包含padding和margin
    var iPinW = $aPin.eq( 0 ).outerWidth();// 一个块框pin的宽
    //console.log(iPinW);
    var num = Math.floor( $( window ).width() / iPinW );//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】

    //oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
    //$('#main').width(iPinW*num).css('margin','0 auto');
    $( "#main" ).css({
        'width':iPinW * num,
        'margin': '0 auto'
    });
    //console.log($( "#main").width())

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    $aPin.each( function( index, value ){
        //console.log(index);
        //console.log(value);
        var pinH = $aPin.eq( index ).outerHeight();
        if( index < num ){
            pinHArr[ index ] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
            var minHIndex = $.inArray( minH, pinHArr );//$.inArray（）判断值在数组中的索引
           //注意value是dom对象，$(value)才是jQuery对象
            $( value ).css({
                'position': 'absolute',
                'top': minH +'px',
                //'left': $aPin.eq( minHIndex ).position().left
                'left': minHIndex*iPinW+'px'
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[ minHIndex ] += $aPin.eq( index).outerHeight();//更新添加了块框后的列高
        }
    });
}

function checkscrollside(){
    var $lastPinH = $( "#main>div").last();
    var lastPinHDis = $lastPinH.offset().top + Math.floor($lastPinH.outerHeight()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $( window ).height();//页面高度
    return (lastPinHDis < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}