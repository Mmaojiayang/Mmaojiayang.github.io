
var XData = ['2022-4-04', '2022-4-05', '2022-4-06', '2022-4-07', '2022-4-08', '2022-4-09', '2022-4-10'];
var YData = [0, 0, 0, 0, 0, 0, 0];
var rllfx = echarts.init(document.getElementById("arightboxbott"));
var option = {
    /* 线条颜色，可设置多个颜色 */
    color: ['#ffa82f'],
    /* 图像四周边距设置 */
    grid:{
        left:30,
        top:30,
        right:20,
        bottom:30
 },
 /* 图例说明 */
 legend: {
     // 图例排项 vertical-"竖向"; horizontal-"横向"
         orient: 'horizontal', 
         // 图例组件离容器左侧的距离
        right : 60,
    top: 0,
    //图例文字的样式
    textStyle:{
        color:'#6ab2ec',
    },
        // 与series中每个name一一对应
        data:['鸟类总数']
    },
 /* 鼠标悬浮时显示数据 */
 tooltip : {
         trigger: 'axis',
         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
         }
     },
    xAxis: {
        type: 'category',
        data: XData,
        //设置轴线的属性
        axisLine:{
            lineStyle:{
                color:'#6ab2ec',
            }
         },
         //调整x轴的lable
         axisLabel:{   
            textStyle:{
            fontSize:10 // 让字体变小
            }
        } 
    },
    yAxis: {
        type: 'value',
        // 控制网格线是否显示
        splitLine: {
            
             show: true, 
             //  改变轴线颜色
             lineStyle: {
                 // 使用深浅的间隔色
                 color: ['#132a6e']
             }                            
        },
        //不显示y轴
        axisLabel: {
            show:false
        },
        //设置轴线的属性
        axisLine:{
             lineStyle:{
                 color:'#6ab2ec',
             }
         } 
    },
    /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
    series: [{
        name:'鸟类总数',
        data: YData,
        type: 'line',
        symbol: 'circle',
        // 设置折点大小
        symbolSize: 10,
        // 设置为光滑曲线
        smooth: true
    },]
};
 rllfx.setOption(option);