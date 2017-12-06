Ext.define('inas.view.system.WorkFlowPermWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.workFlowPermWin',
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            width: 340,
            layout: 'fit',
            modal: true,
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                layout: 'anchor',
                method: 'post',
                defaults: {
                    anchor: '90%'
                },
                defaultType: 'textfield',
                items: [{
                    name: 'id',
                    hidden: true
                }, {
                    name: 'name',
                    fieldLabel: '<span style="color:red;">*</span>权限名称',
                    allowBlank: false,
                    maxLength: 20
                }, {
                    fieldLabel: '权限编码',
                    name: 'code',
                    maxLength: 20
                }, {
                    xtype: 'numberfield',
                    fieldLabel: '排列顺序',
                    name: 'lo',
                    maxLength: 9
                }]
            }],
            buttons: [{
                xtype: 'jbutton',
                action: 'save'
            }, {
                xtype: 'jbutton',
                action: 'reset'
            }]
        });
        this.callParent(arguments);
    }
});