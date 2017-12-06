/**
 * Created by JM-SD09 on 2015/9/25.
 */
Ext.define('inas.view.work.SwitchWinForm', {
    extend: 'Ext.Window',
    alias: 'widget.switchWinForm',
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            width: 500,
            height: 370,
            modal: true,
            title: '新增',
            layout: 'fit',
            items: [{
                xtype: 'form',
                name: 'switchWindowForm',
                layout: 'anchor',
                anchor: '100% 50%',
                buttonAlign: 'center',
                bodyPadding: 5,
                defaults: {
                    anchor: '95%',
                    margin: '5 0 0 5'
                },
                items: [{
                    xtype: 'hiddenfield', name: 'id'
                }, {
                    xtype: 'hiddenfield', name: 'stuts'
                }, {
                    xtype: 'hiddenfield', name: 'data_item_id'
                }, {xtype: 'hiddenfield', name: 'entity_id'}, {
                    xtype: 'hiddenfield', name: 'type'
                }, {
                    xtype: 'textfield', fieldLabel: '站点名', labelWidth: 50, name: 'entity_name', readOnly: true
                }, {
                    xtype: 'textfield', fieldLabel: '机泵名', labelWidth: 50, name: 'data_item_name', readOnly: true
                },{
                     xtype: 'textfield', fieldLabel: '开停前压力1', labelWidth: 80, name: 'start_stop_before_pressure1'
                },{
                    xtype: 'textfield', fieldLabel: '开停前压力2', labelWidth: 80, name: 'start_stop_before_pressure2'
                },{
                    xtype: 'textfield', fieldLabel: '开停后压力1', labelWidth: 80, name: 'start_stop_after_pressure1'
                },{
                    xtype: 'textfield', fieldLabel: '开停后压力2', labelWidth: 80, name: 'start_stop_after_pressure2'
                },{
                    fieldLabel: '指令',
                    xtype: 'radiogroup',
                    width: 100,
                    items: [{
                        name: 'data_value',
                        inputValue: 1,
                        boxLabel: '开'
                    }, {
                        name: 'data_value',
                        inputValue: 0,
                        boxLabel: '停'
                    }]
                }, {
                    fieldLabel: '时间',
                    labelWidth: 50,
                    xtype: 'datetimefield',
                    name: 'recordTime',
                    format: 'Y-m-d H:i:s',
                    allowBlank : false
                }], bbar: ['->', {
                    xtype: 'jbutton', action: 'submit'
                }, {
                    xtype: 'jbutton', action: 'close'
                }]
            }]
        });
        this.callParent(arguments);
    }
})