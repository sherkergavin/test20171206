/**
 * Created by JM-SD09 on 2016/3/24.
 */

Ext.define('inas.view.data.MiddleConfirmWindow', {
    extend: 'Ext.Window',
    alias: 'widget.MiddleConfirmWindow',
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            buttonAlign: 'center',
            width: "45%",
            layout:'fit',
            modal: true,
            items: [{
                name: 'middleConfirmForm',
                xtype: 'form',
                //layout: 'anchor',
                buttonAlign: 'center',
                bodyPadding: 5,
                defaults: {
                    anchor: '95%',
                    margin: '5 0 0 5',
                    allowBlank: false
                }, items: [{xtype: 'hiddenfield', name: 'id'},
                    {
                        xtype: 'textfield',
                        fieldLabel: '站点',
                        readOnly : true,
                        name: 'entity_name'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '泵',
                        readOnly : true,
                        name: 'data_item_name'
                    },{
                        xtype: 'datetimefield',
                        fieldLabel: '时间',
                        name: 'record_time_in_3rd_db',
                        editable: false,
                        readOnly: true,
                        format:'Y-m-d H:i:s'
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: '指令',
                        disabled: true,
                        items: [{
                            name: 'data_value',
                            inputValue: 1,
                            boxLabel: '进水'
                        }, {
                            name: 'data_value',
                            inputValue: 0,
                            boxLabel: '关水',
                            checked: true
                        }]
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: '确认指令',
                        items: [{
                            name: 'valueconfirm',
                            inputValue: 0,
                            boxLabel: '开'
                        }, {
                            name: 'valueconfirm',
                            inputValue: 1,
                            boxLabel: '关'
                        }, {
                            name: 'valueconfirm',
                            inputValue: 2,
                            boxLabel: '跳车'
                        }, {
                            name: 'valueconfirm',
                            inputValue: 3,
                            boxLabel: '无指令',
                            checked: true
                        }]
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '指令人',
                        name: 'user_name',
                        readOnly: true
                    }
                ],
                buttons: [{
                    xtype: 'jbutton',
                    text: '  确  认',
                    action: 'submit'
                }, {
                    xtype: 'jbutton',
                    action: 'reset'
                }]
            }]
        });
        this.callParent(arguments);
    }
});