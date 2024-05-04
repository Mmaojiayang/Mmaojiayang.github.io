var myyyChart = echarts.init(document.getElementById('aleftboxtmidd'));

// 随机生成三份数据
function generateData(total) {
    // 最小的一份不能小于总数的10%
    var minPart = Math.max(total * 0.2, 1);

    // 生成两个随机数，表示第一份数据和第二份数据的比例
    var part1 = Math.random() * (total - 2 * minPart) + minPart;
    var part2 = Math.random() * (total - part1 - minPart) + minPart;

    // 计算第三份数据的比例
    var part3 = total - part1 - part2;

    return [Math.round(part1), Math.round(part2), Math.round(part3)];
}

// 初始数据
var total = 1000; // 设置总数
var data = generateData(total);

// 配置项和数据
var option = {
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '80%',
            data: [
                {value: data[0], name: '发现'},
                {value: data[1], name: '疑似'},
                {value: data[2], name: '无'}
            ],
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}: {c}'
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表
myyyChart.setOption(option);

// 每秒更新数据
setInterval(function () {

    // 生成新的数据
    var newData = generateData(total);

    // 更新数据
    myyyChart.setOption({
        series: [{
            data: [
                {value: newData[0], name: '发现'},
                {value: newData[1], name: '疑似'},
                {value: newData[2], name: '无'}
            ]
        }]
    });

    // 随机选择一个数据点进行高亮显示
    var randomIndex = Math.floor(Math.random() * newData.length);
    myyyChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: randomIndex
    });
}, 2000); // 每秒更新一次
