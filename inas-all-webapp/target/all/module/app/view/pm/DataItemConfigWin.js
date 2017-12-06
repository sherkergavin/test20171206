Ext.define('inas.view.pm.DataItemConfigWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.dataItemConfigWin',
    title: '数据项配置',
    config: {
        data_item_id: 0
    },
    buttonAlign: 'center',
    requires: [
        'Jm.button.Button'
    ],
    initComponent: function () {
        var data_item_idFi = Ext.create('Ext.form.field.Hidden', {
            name: 'data_item_id'
        });
        var taskCom = Ext.create('Ext.form.field.ComboBox', {
            name: 'collect_task_id',
            fieldLabel: '采集任务',
            store: 'pm.AllCollectTaskStore',
            queryMode: 'local',
            editable: false,
            hiddenName: 'id',
            //displayField : 'name',
            displayField: 'text',
            valueField: 'id',
            triggerAction: 'all',
            allowBlank: false
        });

        Ext.apply(this, {
            width: 400,
            height: 400,
            layout: 'border',
            buttonAlign: 'center',
            modal: true,
            items: [{
                xtype: 'form',
                region: 'north',
                bodyPadding: 5,
                layout: 'anchor',
                defaults: {
                    anchor: '90%'
                },
                items: [{
                    xtype: 'hiddenfield', name: 'id'
                },
                data_item_idFi,
                taskCom,
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: '采集键值'
                }]
            }
            ,
            {
                xtype: 'grid',
                region: 'center',
                store: 'pm.CollectTagNameStore',
                border: true,
                name: 'tagGrid',
                forceFit: true,
                columns: [
                    {header: '采集键值', dataIndex: 'gather_key', align: 'center'}
                ]
            }
        ],
        listeners: {
            render: function (t, e) {
                data_item_idFi.setValue(t.getData_item_id());
            }
        },
        buttons: [
            {
                xtype: 'button',
                name: 'save',
                text: '保存'
            }
        ]});
        this.callParent(arguments);
    }
});