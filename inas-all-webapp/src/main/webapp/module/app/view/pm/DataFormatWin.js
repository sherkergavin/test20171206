Ext.define('inas.view.pm.DataFormatWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.dataFormatWin',
    requires: [
        'Jm.button.Button'
    ],
    config: {
        treeId: 0,
        controller: null
    },
    title: '数据类型',
    width: 400,
    layout: 'fit',
    modal: true,
    items: [{
        xtype: 'form',
        method: 'post',
        layout: 'anchor',
        name : 'dataValueForm',
        bodyPadding: 5,
        defaults: {
            anchor: '95%',
            margin: '5 0 0 5'
        },
        items: [
            {
                xtype: 'hiddenfield',
                name: 'id'
            },
            {
                xtype: 'hiddenfield',
                name: 'dataFormatId'
            },
            {
                xtype: 'hiddenfield',
                name : 'name'
            },
            {
                xtype: 'combo',
                fieldLabel: '所属类型<span style="color:red;">*</span>',
                name: 'data_type',
                allowBlank: false,
                editable: false,
                readOnly: true,
                store: Ext.create('inas.store.system.DictionaryStore'),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                triggerAction: 'all',
                maxLength: 255
            },
            {
                xtype: 'combo',
                fieldLabel: '数据类型名称<span style="color:red;">*</span>',
                name: 'data_format_id',
                store: Ext.create('inas.store.pm.DataFormatStore'),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                allowBlank: false,
                maxLength: 255
            },
            {
                xtype:'textfield',
                fieldLabel:'数据类型名称<span style="color:red;">*</span>',
                jm : 'formatname',
                allowBlank: false,
                maxLength: 255
            },
            //{
            //    xtype: 'combo',
            //    fieldLabel: '小数位数<span style="color:red;">*</span>',
            //    name: 'data_spec',
            //    allowBlank: false,
            //    editable: false,
            //    store: 'data.DataSpecComboStore',
            //    queryMode: 'local',
            //    displayField: 'name',
            //    valueField: 'id',
            //    triggerAction: 'all',
            //    maxLength: 255
            //},
            {
                xtype: 'numberfield',
                fieldLabel: '小数位数<span style="color:red;">*</span>',
                name: 'data_spec',
                allowBlank: false,
                allowDecimals: false,//禁用小数
                hidden: true,
                maxValue: 5,
                minValue: 0
            },
            {
                xtype: 'textfield',
                fieldLabel: '数据单位<span style="color:red;">*</span>',
                name: 'data_unit',
                allowBlank: false,
                maxLength: 255
            },
            {
                xtype: 'combo',
                fieldLabel: '选择开关状态<span style="color:red;">*</span>',
                name: 'dictionaryId',
                allowBlank: false,
                store: Ext.create('inas.store.system.DictionaryStore'),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                hidden: true,
                triggerAction: 'all'
            },
            {
                xtype: 'numberfield',
                fieldLabel: '设置状态值<span style="color:red;">*</span>',
                name: 'value',
                allowBlank: false,
                allowDecimals: false,//禁用小数
                hidden: true,
                maxLength: 255
            },
            {
                fieldLabel: '排序',
                name: 'lo',
                xtype: 'numberfield',
                allowDecimals: false,//禁用小数
                decimalPrecision: 0,
                maxValue: 99,
                minValue: 0
            },
            {
                xtype: 'textfield',
                fieldLabel: '备注',
                name: 'description',
                maxLength: 35
            }
        ]
    }],
    buttons: [{
        xtype: 'jbutton',
        action: 'save'
    }, {
        xtype: 'jbutton',
        action: 'reset'
    }]
});