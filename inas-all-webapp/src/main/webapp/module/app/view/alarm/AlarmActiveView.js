/**
 * Created by ZS on 2015/7/29.
 */
Ext.define('inas.view.alarm.AlarmActiveView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.alarmActiveView',
    initComponent: function () {
        var m = this;
        var tbar = Ext.create("Ext.Toolbar", {
            align: 'left',
            region: 'north',
            height: 60,
            defaults: {
                anchor: '95%',
                margin: '5 0 0 0',
                labelAlign: 'right'
            },
            items: [
                {
                    fieldLabel: '告警类型',
                    name: 'type',
                    xtype: 'combo',
                    store: Ext.create('inas.store.system.DictionaryStore'),
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false
                },
                {
                    fieldLabel: '告警级别',
                    name: 'severity',
                    xtype: 'combo',
                    store: Ext.create('inas.store.system.DictionaryStore'),
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false
                },
                {
                    fieldLabel: '数据类型',
                    name: 'data_item_id',
                    xtype: 'combo',
                    store: 'data.DataFormatStore',
                    queryMode: 'query',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '告警内容',
                    name: 'message'
                },
                {
                    xtype: 'jbutton',
                    action: 'search'
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
                    store: 'alarm.AllAlarmActiveStore',
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
                            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
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
                    action: 'clear',
                    text:'清除所选告警'
                },
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