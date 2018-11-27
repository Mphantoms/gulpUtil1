/**
 * author Phantom
 */

 (function(root){
    var initNum = 0;
    
    var imax = function(){
        this.version = 'v0.1.0'
    }
    //数字逐渐增加
    imax.numUp = function(id,num){
        var num = parseInt(num);
        var step = 12;
        var stepnum = num / step;
        $(id).text(0);
        var timer = setInterval(function(){
            if(stepnum * initNum < num){
                initNum ++;
                $(id).text(parseInt(stepnum * initNum));
            }else if(stepnum * initNum == num){
                clearInterval(timer);
            }
        },45)
    }
    //初始化loading
    imax.loding = function(dtd){
        setInterval(function(){
            $("#loading").find('img').show();
        },200)
        setTimeout(function(){
            $("#loading").hide();
            dtd.resolve();
        },3000)
        return dtd;
    }
    //初始化时间
    imax.timer = function(selector){
        Date.prototype.Format = function(fmt){ 
            var o = {   
            "M+" : this.getMonth()+1,
            "d+" : this.getDate(),
            "h+" : this.getHours(),                 
            "m+" : this.getMinutes(),                
            "s+" : this.getSeconds(),                
            "q+" : Math.floor((this.getMonth()+3)/3), 
            "S"  : this.getMilliseconds()             
            };   
            if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
            for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
            return fmt;   
        } 
        setInterval(function(){
            var datees = new Date();
            $(selector).html(datees.Format("yyyy-MM-dd hh:mm:ss"));
        },1000)
    }
    //初始化页面的宽高，并自适应
    imax.init = function(){
        var hbit = $(window).height() / $('body').height();
        var wbit = $(window).width() /$('body').width();
        $('body').css({
            transform: 'scale('+wbit+','+hbit+')'
        })
    }
    //地图初始化
    imax.mapes = function(){
        setTimeout(function(){
            var mp = new BMap.Map("mapcontent");
            mp.setMapStyle({style: 'midnight'});
            mp.enableScrollWheelZoom();
            mp.centerAndZoom(new BMap.Point(121.48789949,31.24916171), 18);
        },0)
    }
    //初始化echrts
    imax.echart = function(data){
        var myChart = echarts.init(document.getElementById('main'));
        option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '2%',
                right: '5%',
                bottom: '2%',
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 18
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 3
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 18
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 3
                    }
                },
                splitNumber : 2,
                nameGap: 30,
                min:0,
                max:function(value) {
                    return value.max - 20;
                }
            },
            series: data
        };
        myChart.setOption(option);
    }
    root.imax = imax;
 })(this)
