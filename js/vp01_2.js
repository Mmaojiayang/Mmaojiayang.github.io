var myChart = echarts.init(document.getElementById('aleftboxtbott'));
option = {
    color: ['#7ecef4'],
    title: {
        top: 5,
        left: 20,
        textStyle: {
            fontSize: 10,
            color: '#fff'
        }
    },
    legend: {
        right: 10,
        top: 5,
        textStyle: {
            fontSize: 10,
            color: '#fff'
        },
        data: ['2024年3月', '2024年4月']
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
            show: false, // 隐藏X轴的数字
            color: "#fff"
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
            color: "#fff"
        },
        data: ['苍鹭', '白颊黑雁', '东方白鹳']
    },
    series: [{
        name: '2024年3月',
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
                        color: 'rgba(117,72,159,.7)'
                    }]
                )
            }
        },
        data: [150, 140, 155]
    }, {
        name: '2024年4月',
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
        data: [148, 105, 160]
    }]
};
myChart.setOption(option);
