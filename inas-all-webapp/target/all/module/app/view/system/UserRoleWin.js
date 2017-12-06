Ext.define('inas.view.system.UserRoleWin',{
    extend : 'Ext.window.Window',
    alias : 'widget.userRoleWin',
    initComponent : function () {
        var me = this;
        Ext.apply(this,{
            width : 400,
            layout : 'fit',
            modal : true,
            items : [{
                xtype : 'form',
                bodyPadding : 10,
                layout : 'anchor',
                method:'post',
                defaults : {
                    anchor : '90%'
                },
                // The fields
                defaultType : 'textfield',
                items : [{
                    name : 'id',
                    hidden : true
                }, {
                    fieldLabel: '<span style="color:red;">*</span>角色名',
                    name: 'name',
                    allowBlank: false,
                    maxLength: 255
                },{
                    xtype: 'numberfield',
                    fieldLabel: '排列顺序',
                    name: 'lo',
                    maxLength: 9
                },{
                    xtype: 'textareafield',
                    grow: true,
                    name: 'description',
                    fieldLabel: '备注信息',
                    maxLength: 2000
                }]
            }],
            buttons : [{
                xtype : 'jbutton',
                action:'save'
            },{
                xtype : 'jbutton',
                action:'reset'
            }]
        })
        this.callParent(arguments);
    }
})