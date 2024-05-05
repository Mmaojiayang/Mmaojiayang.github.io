function loadMap() {
    var alaxGeoCoordMap = {
        '巴彦浩特镇': [105.70076900000004, 38.84741400000001],
        '巴彦诺日公苏木': [104.81555100000003, 40.164598],
        "超格图呼热苏木": [105.14156100000002, 38.049944],
        "额尔克哈什哈苏木": [103.710372, 38.302777],
        "吉兰泰镇": [105.76308300000005, 39.743072],
        "温都尔勒图镇": [104.30157800000006, 37.448355],
        "乌力吉苏木": [104.51224300000001, 40.744232],
        "银根苏木": [105.19668300000001, 40.838229],
        "宗别立镇": [106.20795799999996, 39.263541],
        "敖伦布拉格镇": [106.45298500000001, 40.531693],
        "巴润别立镇": [105.61228000000006, 38.533707]
    };
    var alaxDatas = [
        [{
            name: '巴彦诺日公苏木',
            value: 10
        }],
        [{
            name: '超格图呼热苏木',
            value: 100
        }],
        [{
            name: '额尔克哈什哈苏木',
            value: 140
        }],
        [{
            name: '吉兰泰镇',
            value: 180
        }],
        [{
            name: '温都尔勒图镇',
            value: 260
        }],
        [{
            name: '乌力吉苏木',
            value: 300
        }],
        [{
            name: '银根苏木',
            value: 10
        }],
        [{
            name: '宗别立镇',
            value: 50
        }],
        [{
            name: '敖伦布拉格镇',
            value: 220
        }],
        [{
            name: '巴润别立镇',
            value: 0
        }],
    ];

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = alaxGeoCoordMap[dataItem[0].name];
            var toCoord = [105.70076900000004, 38.84741400000001];
            if (fromCoord && toCoord) {
                res.push([{
                    fromName: dataItem[0].name,
                    // toName: dataItem[1].name,
                    coord: fromCoord,
                    value: dataItem[0].value
                }, {
                    coord: toCoord,
                }]);
            }
        }
        return res;
    };

    var series = [];

    [
        ['巴彦浩特镇', alaxDatas]
    ].forEach(function (item, i) {
        series.push({
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', //箭头图标
                    symbolSize: 5, //图标大小
                },
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: .3 //尾迹线条曲直度
                    }
                },
                data: convertData(item[1])
            }, {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: { //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: 'stroke', //波纹绘制方式 stroke, fill
                    scale: 5 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                    normal: {
                        show: true,
                        position: 'bottom', //显示位置
                        offset: [0, 5], //偏移设置
                        formatter: function (params) { //圆环显示文字
                            return params.data.name;
                        },
                        fontSize: 14
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: 'circle',
                symbolSize: function (val) {
                    return 10; //圆环大小
                },
                itemStyle: {
                    normal: {
                        show: false,
                        color: '#f00'
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: alaxGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                }),
            },
            // 汇聚点
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: 'stroke',
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        //offset:[5, 0],
                        color: '#0f0',
                        formatter: '{b}',
                        textStyle: {
                            color: "#0f0"
                        }
                    },
                    emphasis: {
                        show: true,
                        color: "#f60"
                    }
                },
                symbol: 'image://./img/icon-shield.png',
                symbolOffset: [0, '-50%'],
                symbolSize: 50,
                data: [{
                    name: item[0],
                    value: alaxGeoCoordMap[item[0]].concat([500]),
                }],
            }
        );
    });

    //获取地域分布数据
    const mapChart = echarts.init(document.getElementById("mapChart"), "shine");

    $.ajax({
        url: ajaxBaseUrl + "data/152900.json",
        dataType: "json",
        async: false,
    }).done(function (data) {
        echarts.registerMap(name, data);
        console.log(name)
        const mapChartOpt = {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(166, 200, 76, 0.82)',
                borderColor: '#FFFFCC',
                showDelay: 0,
                hideDelay: 0,
                enterable: true,
                transitionDuration: 0,
                extraCssText: 'z-index:100',
                formatter: function (params, ticket, callback) {
                    //根据业务自己拓展要显示的内容
                    if (params.seriesType == "effectScatter") {
                        var res = "";
                        var name = params.name;
                        var value = params.value[params.seriesIndex + 1];
                        res = "<span style='color:#fff;'>" + name + "</span><br/>网格员数：" + value;
                        return res;
                    } else if (params.seriesType == "scatter") {
                        var res = "";
                        var name = params.name;
                        var value = params.data.value[2];
                        res = "<span style='color:#fff;'>" + name + "</span><br/>网格员数：" + value;
                        return res;
                    } else if (params.seriesType == "lines") {
                        return "<span style='color:#fff;'>" + params.data.fromName + "</span><br />网格员数：" + params.data.value;
                    } else {
                        return name;
                    }

                }
            },
            backgroundColor: "rgba(0, 0, 0, 0)",
            visualMap: { //图例值控制
                min: 0,
                max: 300,
                calculable: true,
                show: false,
                color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                type: "map",
                roam: false, //开启鼠标缩放和漫游
                zoom: 1.4, //地图缩放级别
                label: {
                    emphasis: {
                        show: true,
                        color: "#fff",
                        position: ['10%', '10%']
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(51, 69, 89, 0)', //地图背景色
                        borderColor: 'rgba(81, 106, 137, .8)', //省市边界线00fcff 516a89
                        borderWidth: 1
                    },
                    emphasis: {
                        color: 'rgba(37, 43, 61, .5)' //悬浮背景
                    }
                },
                center: [104.70076900000004, 39.24741400000001]
                // regions: [{
                //     name: '阿拉善左旗',
                //     itemStyle: {
                //         areaColor: 'rgba(37, 43, 61, .5)',
                //         color: 'red'
                //     }
                // }]
                // selectedMode: "single",
                // top: 10,
                // bottom: 10,
                // layoutCenter: ["50%", "50%"],
                // //layoutSize: "100%", //保持地图宽高比
            },
            series: series
        };
        mapChart.setOption(mapChartOpt);
    }).fail(function (jqXHR) {
        console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
    });
}