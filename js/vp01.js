
var myChart = echarts.init(document.getElementById('aleftboxtbott'));
option = {
    color: ['#7ecef4'],
    backgroundColor: 'rgba(1,202,217,.2)',
    title: {
        top: 5,
        left: 20,
        textStyle: {
            fontSize: 10,
            color: 'rgba(255,255,255,.6)'
        },
        text: ''
    },
    legend: {
        right: 10,
        top: 5,
        textStyle: {
            fontSize: 10,
            color: 'rgba(255,255,255,.6)'
        },
        // data: ['2022年3月', '2022年4月']
    },
    grid: {
        left: 20,
        right: 20,
        top: 30,
        bottom: 2,
        containLabel: true
    },

    xAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.2)'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0)'
            }
        },
        axisLabel: {
            color: "rgba(255,255,255,0)"
        },
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
    
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.5)'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
        axisLabel: {
            color: "rgba(255,255,255,.5)"
        },
        data: ['苍鹭', '白颊黑雁', '东方白鹳 ', '灰鹤']
    },
    series: [{
        name: '2022年3月',
        type: 'bar',
        barWidth: 15,
        label: {
            show: true,
            position: 'inside'
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(77,114,217,.7)'
                    }, {
                        offset: 1,
                        color: 'rgba(117,72,159,.7'
                    }]
                )
            }
        },
        // data: [400, 500, 600, 700]
        data:[0,0,0,0]
    }, {
        name: '2024年2月',
        type: 'bar',
        barWidth: 15,
        label: {
            show: true,
            position: 'inside'
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(230,253,139,.7)'
                    }, {
                        offset: 1,
                        color: 'rgba(41,220,205,.7)'
                    }]
                )
            }
        },
        data: [0, 0, 0, 0]
    }]
};
myChart.setOption(option);