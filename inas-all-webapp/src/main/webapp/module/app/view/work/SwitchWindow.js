/**
 * Created by JM-SD09 on 2015/9/24.
 */
Ext.define('inas.view.work.SwitchWindow', {
    extend: 'Ext.Window',
    alias: 'widget.switchWindow',

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            width: 1000,
            height: 500,
            layout: 'anchor',
            modal: true,
            items: [
                {
                    xtype: 'form',
                    layout: 'anchor',
                    anchor: '100% 20%',
                    name: 'switchWinForm',
                    buttonAlign: 'center',
                    bodyPadding: 5,
                    defaults: {
                        anchor: '95%',
                        margin: '5 0 0 5'
                    },
                    items: [{xtype: 'hiddenfield', name: 'id'},{xtype: 'hiddenfield', name: 'recordTime'}, {xtype: 'hiddenfield', name: 'entity_id'}, {
                        xtype: 'textfield', fieldLabel: '站点名', labelWidth: 100, name: 'entity_name', readOnly: true
                    }, {
                        xtype: 'hiddenfield', id:'data_format_id', name: 'data_format_id'
                    }, {
                        xtype: 'hiddenfield', name: 'entity_type_id'
                    }, {
                        xtype: 'hiddenfield', name: 'entity_id'
                    }, {
                        xtype: 'hiddenfield', name: 'data_item_id'
                    }, {
                        xtype: 'textfield', fieldLabel: '机泵名', labelWidth: 100, name: 'data_item_name', readOnly: true
                    }, {
                        xtype: 'hiddenfield', name: 'type', readOnly: true
                    }
                    //{
                    //    fieldLabel: '指令',
                    //    xtype: 'radiogroup',
                    //    width: 100,
                    //    items: [{
                    //        name: 'data_value',
                    //        inputValue: 1,
                    //        readOnly: true,
                    //        boxLabel: '开'
                    //    }, {
                    //        name: 'data_value',
                    //        inputValue: 0,
                    //        readOnly: true,
                    //        boxLabel: '停',
                    //        checked: true
                    //    }]
                    //}, {
                    //    fieldLabel: '操作',
                    //    xtype: 'radiogroup',
                    //    width: 100,
                    //    items: [{
                    //        name: 'stuts',
                    //        inputValue: 1,
                    //        boxLabel: '正常'
                    //    }, {
                    //        name: 'stuts',
                    //        inputValue: 2,
                    //        boxLabel: '转车'
                    //    }, {
                    //        name: 'stuts',
                    //        inputValue: 0,
                    //        boxLabel: '失败'
                    //    }]
                    //}, {
                    //    xtype: 'datefield', fieldLabel: '指令时间', labelWidth: 100, name: 'time', readOnly: true,
                    //    format: 'Y-m-d H:i:s', value: Ext.Date.format(new Date(), 'Y-m-d H:i:s')
                    //}
                    ]
                }, {
                    border: true,
                    xtype: 'grid',
                    anchor: '100% 80%',
                    name: 'switchWinGrid',
                    buttonAlign: 'center',
                    store: 'work.switchWindowStore',
                    columns: [{
                        text: '指令时间',
                        dataIndex: 'order_time',
                        stripeRows:'true',
                        align:'center',
                        flex: 1,
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    },{
                        text:'复令时间',
                        dataIndex:'repl_order_time',
                        align:'center',
                        flex: 1,
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    },{
                        text: 'id', dataIndex:'id',align:'center',hidden:true
                    },{
                        text:'前压力1',dataIndex:'pressure_before',align:'center',hidden:true
                    },{
                        text:'前压力2',dataIndex:'pressure2_before',align:'center',hidden:true
                    },{
                        text:'前压力3',dataIndex:'pressure3_before',align:'center',hidden:true
                    },{
                        text:'后压力1',dataIndex:'pressure_after',align:'center',hidden:true
                    },{
                        text:'后压力2',dataIndex:'pressure2_after',align:'center',hidden:true
                    },{
                        text:'后压力3',dataIndex:'pressure3_after',align:'center',hidden:true
                    },{
                        text:'压力',dataIndex:'pressure_all',align:'center',flex:2
                    },{
                        text: '指令',
                        dataIndex: 'op_order',
                        align:'center',
                        renderer: function (value,cellmeta,record) {
                            var format = Ext.getCmp('data_format_id').getValue();
                            if(format==108){
                                if(value == 1) {
                                    return '进水';
                                } else if (value == 0) {
                                    return '关水';
                                }
                            }else{
                                if (value == 1){
                                    return '开';
                                } else if (value == 0) {
                                    return '停';
                                } else if (value == 2) {
                                    return '跳车'
                                }
                            }
                        }
                            //width: 100,
                            //items: [{
                            //    name: 'data_value',
                            //    inputValue: 1,
                            //    readOnly: true,
                            //    boxLabel: '开'
                            //}, {
                            //    name: 'data_value',
                            //    inputValue: 0,
                            //    readOnly: true,
                            //    boxLabel: '停',
                            //    checked: true
                            //}]
                    }, {
                        text:'指令人',
                        dataIndex:'user_name',
                        align:'center',
                        flex: 1
                    }, {
                        text:'description',
                        dataIndex:'description',
                        align:'center',
                        hidden:true
                    } ],
                    listeners: {
                        'select': {
                            fn: function (t, record, item, index, e, eOpts) {
                            //console.log(record.data)
                            }
                        }
                    }
                }
            ],
            buttons: [{
                xtype: 'jbutton',
                action: 'add'
            },
            {
                xtype: 'jbutton',
                action: 'edit',
                text:'修&nbsp&nbsp&nbsp改'
            },
            {
                xtype: 'jbutton',
                action: 'save',
                hidden:true
            }, {
                xtype: 'jbutton',
                action: 'close'
            }],
            forceFit: true
        });
        this.callParent(arguments);
    }
});