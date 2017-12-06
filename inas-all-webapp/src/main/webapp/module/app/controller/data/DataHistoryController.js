/**
 * Created by WangJm on 2015/5/27.
 */
Ext.define('inas.controller.data.DataHistoryController', {
    extend: 'Ext.app.Controller',
    stores: ['pm.DataHistoryStatisticsStore','pm.DataItemStore','pm.StationTypeTreeStore','pm.DataHistoryConfigStore'],

    config : {
        flag:null
    },
    refs: [
        {
        ref: 'dataHistoryWin',
        selector: 'dataHistoryWin'
    }, {
        ref: 'dateFrom',
        selector: 'dataHistoryWin>toolbar>buttongroup>datetimefield[name="from_date"]'
    }, {
        ref: 'dateTo',
        selector: 'dataHistoryWin>toolbar>buttongroup>datetimefield[name="to_date"]'
    }, {
        ref: 'cellCombo',
        selector: 'dataHistoryWin>toolbar>buttongroup>combo[name="cellcombo"]'
    }, {
        ref: 'sampleCombo',
        selector: 'dataHistoryWin>toolbar>buttongroup>combo[name="sampleCombo"]'
    }, {
        ref: 'dataHistoryGrid',
        selector: 'dataHistoryWin>grid'
    }, {
        ref: 'itemCombo',
        selector : 'dataHistoryWin>toolbar>buttongroup>combo[name="itemcombo"]'
    }
    ],
    init: function () {
        this.control({
            'dataHistoryWin': {
                render: this.initHistoryChart
            },
            'dataHistoryWin>toolbar>buttongroup>button[action="search"]': {
               click: this.searchHistoryDataCharts
            },
            'dataHistoryWin>toolbar>buttongroup>button[action="print"]': {
                //click: this.openCPT
            },
            'dataHistoryWin>toolbar>buttongroup>button[action="config"]': {
                click: this.configItem
            }
        });
    },
    initHistoryChart: function (t, eOpts) {
        this.getItemCombo().getStore().removeAll();
        this.setFlag(true);
        var dateFrom = this.getDateFrom().getValue();
        var dateTo = this.getDateTo().getValue();
        var data_item_id = this.getDataHistoryWin().getDataItemId();
        var cfg = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            data_item_id: data_item_id,
            jsonResult : ''
        };
        this.chartShow(cfg);
    },
    searchHistoryDataCharts: function () {
        var json = [];
        var dateFrom = this.getDateFrom().getValue();
        var dateTo = this.getDateTo().getValue();
        var data_item_id = this.getDataHistoryWin().getDataItemId();
        var modified = this.getItemCombo().getStore().getModifiedRecords();
        Ext.each(modified, function (item) {
            json.push(item.data);
        });
        var cfg = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            data_item_id: data_item_id,
            jsonResult: Ext.JSON.encode(json)
        };
        this.chartShow(cfg);
    },
    openCPT: function () {
        var me = this;
        var win = Ext.create('inas.view.report.DataDayReportWin');
        win.setDataItemId(me.getDataHistoryWin().getDataItemId());
        win.setStartTime(me.getDateFrom().getValue());
        win.setEndTime(me.getDateTo().getValue());
        win.show();
    },
    configItem: function () {
        var win = Ext.create('inas.view.pm.DataHistoryConfigWin');
        win.show();
    },
    chartShow: function (cfg) {
        var me = this;
        var colorArray = ['#7cb5ec','#434348','#90ed7d','#f7a35c','#8085e9','#f15c80','#e4d354','#8085e8','#8d4653','#91e8e1'];
        me.getDataHistoryGrid().getStore().load({
            params: {
                'sfrom_date': Ext.util.Format.date(cfg.dateFrom, 'Y-m-d H:i:s'),
                'sto_date': Ext.util.Format.date(cfg.dateTo, 'Y-m-d H:i:s'),
                'data_item_id': cfg.data_item_id,
                'jsonResult':cfg.jsonResult,
                'cell': me.getCellCombo().getValue(),
                'sample': me.getSampleCombo().getValue(),
            }
        });
        $(function () {
            $.post(projectGP('/dataHistory/getDataHistoryList'), {
                'from_date': cfg.dateFrom,
                'to_date': cfg.dateTo,
                'data_item_id': cfg.data_item_id,
                'cell': me.getCellCombo().getValue(),
                'sample': me.getSampleCombo().getValue(),
                'jsonResult':cfg.jsonResult
            }, function (result) {
                if(me.getFlag()){
                    var store = me.getItemCombo().getStore();
                    var data3 = [[cfg.data_item_id,result.object[0].entity_name+'('+result.object[0].item_name+')']];
                    store.add(data3);
                    me.setFlag(false);
                }
                var label = new Array();
                var datas = new Array();
                var seriesArray = new Array();
                var yaxisArray = new Array();
                var yaxis = null;
                var series = null;
                var subtitle = new Object();
                var tempTitle = '';
                var dataTemp = null;
                for(var i=0;i<result.data.length;i++){
                    series = new Object();
                    datas[i] = new Array();
                    for(var j=0;j<result.data[i].length;j++){
                        datas[i][j]= [result.data[i][j].x, result.data[i][j].y];
                    }

                    var find = -1;
                    for(var m=0;m<yaxisArray.length;m++){
                        var yaxis = yaxisArray[m];
                        if (yaxis.title.text == result.object[i].data_unit){
                            find = m;
                            break;
                        }
                    }

                    if (find == -1){
                        yaxis = new Object();
                        yaxis.title = new Object();
                        yaxis.title.text = result.object[i].data_unit;
                        yaxis.title.style = new Object();
                        yaxis.title.style.color = colorArray[i];
                        yaxis.labels = new Object();
                        yaxis.labels.format = '{value}'+result.object[i].data_unit;
                        yaxis.labels.style = new Object();
                        yaxis.labels.style.color = colorArray[i];
                        if(i > 0){
                            yaxis.opposite = true;
                        }
                        find = yaxisArray.length;
                        yaxisArray[yaxisArray.length]=yaxis;
                    }

                    if(i>9)colorArray[i]=colorArray[i-Math.floor(i/10)*10];
                    series.turboThreshold = 9999999;
                    series.tooltip = new Object();
                    series.tooltip.valueSuffix = '('+result.object[i].data_unit+')';
                    series.data = datas[i];
                    series.name = result.object[i].entity_name+'('+result.object[i].item_name+')';
                    series.color = colorArray[i];
                    series.yAxis=find;
                    seriesArray[i]=series;

                    tempTitle += result.object[i].entity_name+ ' ' + result.object[i].item_name +';';
                }
                subtitle.text=tempTitle;
                subtitle.x = -20;

                $('#CurrentDataCharts').highcharts({
                    title: {
                        text: '',
                        x: -20
                    },
                    rangeSelector: {
                        buttons: [{
                            type: 'day',
                            count: 1,
                            text: '1天'
                        },{
                            type: 'week',
                            count: 1,
                            text: '1周'
                        },{
                            type: 'month',
                            count: 1,
                            text: '1月'
                        },{
                            type: 'year',
                            count: 1,
                            text: '1年'
                        },{
                            type: 'all',
                            text: '全部'
                        }],
                        selected: 1,
                        inputEnabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    credits:{
                        enabled:false // 禁用版权信息
                    },
                    subtitle: subtitle,
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                                second: '%Y-%m-%d<br/>%H:%M:%S',
                                minute: '%Y-%m-%d<br/>%H:%M',
                                hour: '%Y-%m-%d<br/>%H:%M',
                                day: '%Y<br/>%m-%d',
                                week: '%Y<br/>%m-%d',
                                month: '%Y-%m',
                                year: '%Y'
                        }
                    },
                    tooltip: {
                        shared: true,
                        //xDateFormat: '%Y-%m-%d %A',
                        formatter: function () {
                            var ctime = new Date(1970, 1, 1);
                            var _itme1 = (parseInt(this.x));//-(8*60*60000))
                            ctime.setTime(_itme1);

                            var year = ctime.getFullYear();
                            var month = ctime.getMonth() + 1;
                            var day = ctime.getDate();
                            var time = ctime.toLocaleTimeString();

                            var s = year + '年' + month + '月' + day + "日  " + time + '<br/> ';
                            $.each(this.points, function (i, point) {
                                s += '<br/>值：' + point.y.toFixed(2);
                            })
                            return s;
                        }
                    },
                    yAxis: yaxisArray,
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series:seriesArray
                });
            });

        });
    }
});