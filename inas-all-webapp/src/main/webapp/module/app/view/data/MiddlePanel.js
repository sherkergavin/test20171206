/**
 * Created by JM-SD09 on 2015/9/21.
 */
Ext.define('inas.view.data.MiddlePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.middlePanel',
    requires: [
        "Ext.ux.TreePicker"
    ],
    initComponent: function () {
        var me = this;
        var tbar = Ext.create('Ext.Toolbar', {
            align: 'center',
            region: 'north',
            name: 'middleToolbar',
            height: 40,
            items: [{
                    xtype: 'jbutton',
                    action: 'add'
                }, {
                    xtype: 'jbutton',
                    action: 'edit'
                }, {
                    xtype: 'jbutton',
                    action: 'delete'
                }, {
                    fieldLabel: '站点',
                    id: 'entity_id',
                    name: 'entity_id',
                    labelWidth:60,
                    xtype: 'combobox',
                    store: 'data.EntityComboBox',
                    emptyText: '请选择',
                    queryMode: 'query',
                    mode: 'local',
                    triggerAction: 'all',
                    displayField: 'NAME',
                    valueField: 'ID',
                    editable: false,
                    allowBlank: false,
                    listeners:{
                        'change': function(me,newValue,oldValue){
                            var entity_id = Ext.getCmp('entity_id').getValue();
                            if(entity_id != null) {
                                Ext.getCmp('item_id').enable();
                                Ext.getCmp('item_id').setValue(null);
                            };
                        }
                    }
                },{
                    fieldLabel: '泵(阀)',
                    name: 'item_id',
                    id: 'item_id',
                    labelWidth:60,
                    xtype: 'combobox',
                    store: 'data.ItemComboBox',
                    emptyText: '请选择',
                    queryMode: 'local',
                    mode: 'local',
                    autoLoad: false,
                    triggerAction: 'all',
                    displayField: 'NAME',
                    valueField: 'ID',
                    editable: false,
                    allowBlank: false
                }, {
                    xtype: 'datetimefield',
                    fieldLabel: '日期',
                    name: 'startTime',
                    editable: false,
                    labelWidth: 60,
                    format: 'Y-m-d H:i:s',
                    value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -2), 'Y-m-d')
                }, {
                    xtype: 'datetimefield',
                    fieldLabel: '至',
                    name: 'endTime',
                    labelWidth: 25,
                    editable: false,
                    format: 'Y-m-d H:i:s',
                    value: new Date()
                }, {
                    xtype: 'jbutton',
                    action: 'search'
                }
                //, "->",{
                //    xtype: 'jbutton',
                //    //text: '确  认',
                //    action: 'confirm'
                //}
            ]
        });
        Ext.apply(me, {
            title: '开停车指令',
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    border: true,
                    region: 'center',//grid布局center
                    width: '60%',
                    xtype: 'grid',
                    name: 'middleGrid',
                    store: 'data.MiddleGridStore',
                    columns: [{text:'id', dataIndex:'id', align:'center', flex:1, hidden:true },
                        {text: 'entity_id', dataIndex: 'entity_id', align:'center', flex:1,hidden:true },
                        {text: '站点', dataIndex: 'entity_name', align: 'center', flex: 4},
                        {text: '泵(阀)', dataIndex: 'data_item_name', align: 'center', flex: 4},
                        {
                            text: '指令时间', dataIndex: 'order_time', align: 'center', flex: 4,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                        },
                        {
                            text: '复令时间', dataIndex: 'repl_order_time', align: 'center', flex:4,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                        },
                        {text:'data_format_id', dataIndex: 'data_format_id', align: 'center', flex:1, hidden:true },
                        {text:'entity_type_id', dataIndex: 'entity_type_id', align: 'center', flex:1, hidden:true },
                        {
                            text: '指令', dataIndex: 'op_order', align: 'center', flex: 4,
                            renderer: function (value,cellmeta,record) {
                                if (value == null)return;
                                var type = record.raw.type;
                                var format = record.raw.data_format_id;
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
                        },{
                            text: '压力',dataIndex:'pressure_all', align: 'center', flex: 4
                        },
                        {text:'压力前1', dataIndex:'pressure_before', align: 'center', flex: 1, hidden:true },
                        {text:'压力前2', dataIndex:'pressure2_before', align: 'center', flex: 1,  hidden:true },
                        {text:'压力前3', dataIndex:'pressure3_before', align: 'center', flex: 1,  hidden:true },
                        {text:'压力后1', dataIndex:'pressure_after', align: 'center', flex: 1,  hidden:true },
                        {text:'压力后2', dataIndex:'pressure2_after', align: 'center', flex: 1,  hidden:true },
                        {text:'压力后3', dataIndex:'pressure3_after', align: 'center', flex: 1, hidden:true },
                        {text: '指令人', dataIndex: 'user_name', align: 'center', flex: 2},
                        {text: '指令人id', dataIndex: 'user_id', align: 'center', flex: 1, hidden:true },
                        {text: '备注', dataIndex: 'description', align: 'center', flex: 1, hidden:true }
                    ], tbar: tbar

                },
                //{
                //    border: true,
                //    xtype: 'form',
                //    hidden:true,//隐藏右侧form表单
                //    region: 'center',
                //    width: '40%',
                //    layout: 'anchor',
                //    name: 'middleForm',
                //    anchor: '100% 30%',
                //    buttonAlign: 'center',
                //    bodyPadding: 5,
                //    defaults: {
                //        anchor: '95%',
                //        margin: '5 0 0 5'
                //    },
                //    items: [{
                //        xtype: 'hiddenfield', name: 'id'
                //    }, {
                //        xtype: 'hiddenfield', name: 'data_item_id'
                //    }, {
                //        xtype: 'datetimefield', name: 'hiddenDateYmd', format: 'Y-m-d', hidden: true
                //    }, {
                //        xtype: 'datetimefield', name: 'hiddenDateYmdHis', format: 'Y-m-d H:i:s', hidden: true
                //    }, {
                //        xtype: 'textfield', fieldLabel: '站点', labelWidth: 100, name: 'entity_name', readOnly: true
                //    }, {
                //        fieldLabel: '操作',
                //        xtype: 'radiogroup',
                //        width: 100,
                //        items: [{
                //            name: 'data_value',
                //            inputValue: 1,
                //            boxLabel: '进水'
                //        }, {
                //            name: 'data_value',
                //            inputValue: 0,
                //            boxLabel: '关水',
                //            checked: true
                //        }]
                //    }, {
                //        xtype: 'datetimefield',
                //        fieldLabel: '时间',
                //        labelWidth: 100,
                //        name: 'recordTime',
                //        format: 'Y-m-d H:i:s',
                //        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                //    }, {
                //        xtype: 'textfield', fieldLabel: '操作人', labelWidth: 100, name: 'user_name', readOnly: true
                //    }, {
                //        xtype: 'textarea', fieldLabel: '备注', labelWidth: 100, width: 100, name: 'description'
                //    }],
                //    bbar: ['->',
                //        {xtype: 'jbutton', action: 'edit'},
                //        {xtype: 'jbutton', action: 'save'},
                //        {xtype: 'jbutton', action: 'reset'}]
                //}
            ],
            forceFit: true
        });
        this.callParent(arguments);


    }
});