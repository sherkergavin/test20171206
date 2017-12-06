/**
 * Created by WangJm on 2015/5/27.
 */
Ext.define('inas.view.pm.DataHistoryWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.dataHistoryWin',
    config: {
        dataItemId: 0
    },
    requires: [
        'Jm.button.Button'
    ],
    initComponent: function () {
        var me = this;

        var data = [['1', '0', '标准']];
        var data2 = [['1', 'AVG', '平均'], ['@', 'MAX', '最高'], ['3', 'MIN', '最低']];

        var itemCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '数据项',
            labelWidth: 60,
            width: 300,
            editable: false,
            name: 'itemcombo',
            store: 'pm.DataHistoryConfigStore',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        });

        var cellCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '单元',
            labelWidth: 37,
            width: 118,
            editable: false,
            name: 'cellcombo',
            store: Ext.create('Ext.data.ArrayStore', {
                fields: [{
                    name: 'id'
                }, {
                    name: 'value'
                }, {
                    name: 'name'
                }],
                data: [['1', '0', '最小'], ['2', '*24*6', '10分钟'], ['3', '*24', '1小时'], ['4', '*6', '4小时'], ['5', '*1', '1天']]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            listeners: {
                beforerender: function (t) {
                    t.setRawValue(t.getStore().getAt(0).get('name'));
                    t.setValue(t.getStore().getAt(0).get('value'));
                },
                select: function (t) {
                    if (t.getRawValue() != '最小') {
                        sampleCombo.getStore().removeAll();
                        sampleCombo.getStore().add(data2);
                        sampleCombo.setRawValue(sampleCombo.getStore().getAt(0).get('name'));
                        sampleCombo.setValue(sampleCombo.getStore().getAt(0).get('value'));
                    } else {
                        sampleCombo.getStore().removeAll();
                        sampleCombo.getStore().add(data);
                        sampleCombo.setRawValue(sampleCombo.getStore().getAt(0).get('name'));
                        sampleCombo.setValue(sampleCombo.getStore().getAt(0).get('value'));
                    }
                }
            }
        });

        var sampleCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '采样',
            labelWidth: 37,
            width: 105,
            editable: false,
            name: 'sampleCombo',
            store: Ext.create('Ext.data.ArrayStore', {
                fields: [{
                    name: 'id'
                }, {
                    name: 'value'
                }, {
                    name: 'name'
                }]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            listeners: {
                render: function (t) {
                    t.getStore().add(data);
                    t.setRawValue(t.getStore().getAt(0).get('name'));
                    t.setValue(t.getStore().getAt(0).get('value'));
                }
            }
        });

        var fromDate = Ext.create('Jm.ux.DateTimeField', {
            xtype: 'datetimefield',
            fieldLabel: '开始日期',
            labelWidth: 60,
            width: 300,
            name: 'from_date',
            format: 'Y-m-d H:i:s',
            editable: false,
            value: Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.DAY - 1))
        });

        var toDate = Ext.create('Jm.ux.DateTimeField', {
            xtype: 'datetimefield',
            fieldLabel: '结束日期',
            labelWidth: 60,
            width: 240,
            name: 'to_date',
            format: 'Y-m-d H:i:s',
            editable: false,
            value: new Date()
        });

        Ext.apply(me, {
            title: '历史数据曲线图',
            modal: true,
            tbar: [{
                xtype: 'buttongroup',
                width: 850,
                columns: 4,
                defaults: {
                    scale: 'small'
                },
                items: [fromDate, toDate, cellCombo, sampleCombo, itemCombo, {
                    xtype: 'jbutton',
                    action: 'config'
                }, {
                    xtype: 'jbutton',
                    action: 'search'
                }, {
                    xtype: 'jbutton',
                    action: 'print',
                    text: '数据表',
                    handler: function () {
                        var startTime = Ext.util.Format.date(fromDate.getValue(),'Y-m-d H:i:s');
                        var endTime = Ext.util.Format.date(toDate.getValue(),'Y-m-d H:i:s');
                        var formula = sampleCombo.getValue();
                        if (cellCombo.getRawValue() == '最小'){
                            formula = 'max';
                        }
                        var time_unit =  cellCombo.getValue();//'*24*60';
                        if (cellCombo.getRawValue() == '最小'){
                            time_unit = '*24*60';
                        }
                        var data_item_id = me.getDataItemId();
                        var data_item_list = itemCombo.getStore().getModifiedRecords();
                        var data_item_list_str = '';
                        if (data_item_list == null || data_item_list == ''){
                            data_item_list_str = data_item_id;
                        }else{
                            Ext.each(data_item_list, function (item) {
                                if (data_item_list_str == ''){
                                    data_item_list_str = item.get('id');
                                }else{
                                    data_item_list_str = data_item_list_str + ',' + item.get('id');
                                }
                            });
                        }

                        var win = Ext.create('Ext.window.Window',{
                            layout: 'fit',
                            resizable : false,
                            width : 1000,
                            height : 700,
                            modal : true,
                            items : [Ext.create('Ext.ux.IFrame', {
                                    align:'center',
                                    frameName: 'Iframe',
                                    src : reportIp('/data_item_day_report.cpt' +
                                                   '&op=write' +
                                                   '&data_item_id=' + data_item_list_str +
                                                   '&startTime=' +  startTime +
                                                   '&endTime=' + endTime +
                                                   '&formula=' + formula +
                                                   '&time_unit=' + time_unit
                                                )
                                })]
                        });
                        win.show();
                    }
                }]
            }],
            resizable: false,
            width: 1200,
            height: 850,
            autoScroll: true,
            layout: 'border',
            items: [{
                region: 'north',
                height: 600,
                html: '<div id="CurrentDataCharts" style="width:100%;height:100%;"></div>'
            }, {
                region: 'center',
                height: 120,
                autoScroll: true,
                xtype: 'grid',
                store: 'pm.DataHistoryStatisticsStore',
                columns: [
                    {xtype: 'rownumberer', text: '', width: 35},
                    {text: '项目名', dataIndex: 'name', flex: 1, align: 'center'},
                    {text: '最大值', dataIndex: 'maxvalue', flex: 1, align: 'center'},
                    {text: '最小值', dataIndex: 'minvalue', flex: 1, align: 'center'},
                    {text: '平均值', dataIndex: 'avgvalue', flex: 1, align: 'center'},
                    {text: '数据量', dataIndex: 'countvalue', flex: 1, align: 'center'}
                ]
            }]
        });
        this.callParent(arguments);
    }
});