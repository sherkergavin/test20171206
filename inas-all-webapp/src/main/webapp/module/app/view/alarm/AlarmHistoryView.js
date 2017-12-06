/**
 * Created by ZS on 2015/7/29.
 */
Ext.define('inas.view.alarm.AlarmHistoryView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.alarmHistoryView',
    initComponent: function () {
        var m = this;
        var tbar = Ext.create("Ext.Toolbar", {
            align: 'center',
            region: 'north',
            height: 80,
            defaults: {
                margin: '5 0 0 0',
                labelAlign: 'right'
            },
            layout:'vbox',
            items:[
                {
                    xtype: 'form', layout: {type: 'hbox', align: 'stretch',labelAlign: 'right'}, name: 'h1', border: false,
                    items: [{
                        fieldLabel: '告警类型',
                        name: 'type',
                        xtype: 'combo',
                        flex:1,
                        store: Ext.create('inas.store.system.DictionaryStore'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        editable: false
                    },
                        {
                            fieldLabel: '是否已确认',
                            name:'acknowledged',
                            xtype: 'combo',
                            flex:1,
                            store: Ext.create('inas.store.data.DataAcknowledgedStore'),
                            queryMode: 'query',
                            displayField: 'message',
                            valueField: 'id',
                            editable: false
                        },
                        {
                            fieldLabel: '告警级别',
                            name: 'severity',
                            xtype: 'combo',
                            flex:1,
                            store: Ext.create('inas.store.system.DictionaryStore'),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            editable: false
                        },{
                            xtype: 'textfield',
                            fieldLabel: '告警内容',
                            flex:2,
                            name: 'message'
                        }
                    ]
                },
                {
                    xtype: 'form', layout: {type: 'hbox', align: 'stretch'}, name: 'h2', border: false,
                    items: [
                        {
                            fieldLabel: '数据类型',
                            name: 'data_item_id',
                            xtype: 'combo',
                            store: 'data.DataFormatStore',
                            queryMode: 'query',
                            flex:1,
                            displayField: 'name',
                            valueField: 'id',
                            editable: false
                        },
                        {
                            xtype: 'datetimefield',
                            fieldLabel: '发生时间',
                            name: 'startTime',
                            flex:1,
                            editable: false,
                            format: 'Y-m-d H:i:s',
                            //value : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -3), 'Y-m-d H:i:s')
                            value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,-1))
                        },
                        {
                            xtype:'text',text:'至',width:105,labelAlign:'center'
                        },
                        {
                            xtype: 'datetimefield',
                            name: 'endTime',
                            editable: false,
                            flex:1,
                            format: 'Y-m-d H:i:s',
                            value :new Date()
                },
                        {
                            xtype: 'jbutton',
                            action: 'search'
                        }
                    ]
                }
            ]
        });
//创建多选框
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this, {
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                //日期查询
                tbar, {
                    xtype: 'grid',
                    width: '88%',
                    region: 'center',
                    border: true,
                    selModel:checkBox,
                    disableSelection: false,//表示可以选择行
                    layout: 'fit',
                    store: 'alarm.AllAlarmHistoryStore',
                    columns: [
                        {
                            text: '',
                            dataIndex: 'id',
                            hidden: true
                        },
                        {
                            text: '',
                            dataIndex: 'policy_id',
                            hidden: true
                        },
                        {
                            text: '',
                            dataIndex: 'data_item_id',
                            hidden: true
                        },
                        {
                            text: '告警类型',
                            dataIndex: 'type_name',
                            editor: 'textfield',
                            flex: 2,
                            align: 'center'
                        },
                        {
                            text: '告警级别',
                            dataIndex: 'severity_name',
                            editor: 'textfield',
                            flex: 2,
                            align: 'center'
                        },

                        {
                            text: '发生时间',
                            dataIndex: 'time_stamp',
                            editable: false,
                            flex: 2,
                            align: 'center',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                        },
                        {
                            text: '发生次数',
                            dataIndex: 'fire_count',
                            editor: 'textfield',
                            flex: 2,
                            align: 'center'
                        },
                        {
                            text: '站点名',
                            dataIndex: 'entity_name',
                            editor: 'textfield',
                            flex: 2,
                            align: 'center'
                        },
                        {
                            text: '数据项',
                            dataIndex: 'data_item_name',
                            editor: 'textfield',
                            flex: 2,
                            align: 'center'
                        },
                        {
                            text: '已确认',
                            dataIndex: 'acknowledged',
                            editor: 'textfield',
                            flex: 2,
                            align: 'center'
                        },
                        {
                            text: '已清除',
                            dataIndex: 'cleaned',
                            editor: 'textfield',
                            flex: 2,
                            align: 'center'
                        },
                        {
                            text: '告警内容',
                            dataIndex: 'message',
                            editor: 'textfield',
                            flex: 4,
                            align: 'center'
                        }
                    ]
                }
            ],
            buttons: [
                {
                    xtype: 'jbutton',
                    action: 'submit',
                    text:'确认所选告警'
                }
            ]
        });
        this.callParent(arguments);
    }
});