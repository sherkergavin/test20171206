/**
 * Created by JM-SD09 on 2016/5/13.
 */

Ext.define('inas.view.work.SwitchMiddleWindow', {
    extend: 'Ext.Window',
    alias: 'widget.SwitchMiddleWindow',
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            buttonAlign: 'center',
            width: "40%",
            layout:'fit',
            modal: true,
            buttons: [{
                xtype: 'jbutton',
                action: 'save'
            }, {
                xtype: 'jbutton',
                action: 'close'
            }],
            items: [
                {
                    name: 'middleForm1',
                    xtype: 'form',
                    layout: 'anchor',
                    buttonAlign: 'center',
                    bodyPadding: 5,
                    defaults: {
                        anchor: '95%',
                        margin: '5 0 0 5'
                    },
                    items: [
                        {xtype: 'hiddenfield', name: 'id'},
                        {xtype: 'hiddenfield', name: 'data_item_id'},
                        {xtype: 'hiddenfield', name: 'user_id'},
                        {
                            layout: 'column',
                            items:[{
                                columnWidth: 0.3,
                                fieldLabel: '站点',
                                labelWidth:70,
                                id: 'entity_type_id',
                                name: 'entity_type_id',
                                xtype: 'combobox',
                                store:'data.MiddleEntityTypeStore',
                                emptyText:'请选择',
                                queryMode:'local',
                                mode:'local',
                                triggerAction: 'all',
                                displayField: 'NAME',
                                valueField: 'ID',
                                editable: false,
                                allowBlank: false,
                                listeners:{
                                    'change': function(me,newValue,oldValue){
                                        var entity_type_id = Ext.getCmp('entity_type_id').getValue();
                                        if(entity_type_id != null) {
                                            Ext.getCmp('entity_name').enable();
                                            Ext.getCmp('entity_name').setValue(null);
                                            Ext.getCmp('data_item_name').setValue(null);
                                            Ext.getCmp('data_item_name').disable();
                                        };
                                    }
                                }
                            }, {
                                xtype: 'combobox',
                                name: 'entity_name',
                                columnWidth: 0.3,
                                id:'entity_name',
                                store:'data.MiddleEntityStore',
                                emptyText: '请选择',
                                queryMode: 'local',
                                mode: 'local',
                                triggerAction: 'all',
                                displayField: 'NAME',
                                valueField: 'ID',
                                editable: false,
                                allowBlank: false,
                                listeners:{
                                    'change': function(me,newValue,oldValue){
                                        var entity_id = Ext.getCmp('entity_name').getValue();
                                        if(entity_id != null) {
                                            Ext.getCmp('data_item_name').enable();
                                            Ext.getCmp('data_item_name').setValue(null);
                                        };
                                    }
                                }
                            }, {
                                xtype: 'combobox',
                                fieldLabel: '机泵(阀门)',
                                labelWidth:70,
                                id: 'data_item_name',
                                name: 'data_item_name',
                                columnWidth: 0.4,
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
                            }]
                        },{
                            layout: 'column',
                            items: [{
                                xtype: 'datetimefield',
                                fieldLabel: '指令时间',
                                labelWidth:70,
                                name: 'order_time1',
                                format: 'Y-m-d H:i:s',
                                allowBlank: false,
                                columnWidth: 0.5
                            },{
                                xtype: 'datetimefield',
                                fieldLabel: '复令时间',
                                labelWidth:70,
                                name: 'repl_order_time1',
                                format: 'Y-m-d H:i:s',
                                allowBlank: false,
                                columnWidth: 0.5
                            }]
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '指令',
                            allowBlank: false,
                            items: [{
                                id: 'op_order1',
                                name: 'op_order',
                                inputValue: 1,
                                boxLabel: '开'
                            }, {
                                id: 'op_order2',
                                name: 'op_order',
                                inputValue: 0,
                                boxLabel: '停'
                            }, {
                                id: 'op_order3',
                                name: 'op_order',
                                inputValue: 2,
                                boxLabel: '跳车'
                            }]
                        },
                        {
                            layout: 'column',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: '操作前进压',
                                labelWidth:70,
                                name: 'pressure_before',
                                columnWidth: 0.2
                            },{
                                xtype: 'textfield',
                                fieldLabel: '操作前出压',
                                labelWidth:70,
                                name: 'pressure2_before',
                                columnWidth: 0.2,
                            },{
                                xtype: 'textfield',
                                labelSeparator: '',
                                fieldLabel: '/',
                                labelWidth: '0',
                                name: 'pressure3_before',
                                columnWidth: 0.1
                            },{
                                xtype: 'textfield',
                                fieldLabel: '操作后进压',
                                labelWidth:70,
                                name: 'pressure_after',
                                columnWidth: 0.2
                            },{
                                xtype: 'textfield',
                                fieldLabel: '操作后出压',
                                labelWidth:70,
                                name: 'pressure2_after',
                                columnWidth: 0.2
                            },{
                                xtype: 'textfield',
                                labelSeparator: '',
                                labelWidth: '0',
                                fieldLabel: '/',
                                name: 'pressure3_after',
                                columnWidth: 0.1
                            }]
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '指令人',
                            labelWidth:70,
                            name: 'user_name',
                            readOnly: true
                        }, {
                            xtype: 'textareafield',
                            //labelAlign:'right',
                            labelWidth:70,
                            fieldLabel: '备注',
                            name: 'description'
                        },
                    ]

                }]
        });
        this.callParent(arguments);
    }
});