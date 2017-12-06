Ext.define('inas.view.system.RolePermWin',{
    extend : 'Ext.window.Window',
    alias : 'widget.rolePermWin',
    initComponent : function () {
        var me = this;

        Ext.apply(this,{
            width : 340,
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
                },{
                    xtype: 'combo',
                    name: 'permission_type',
                    fieldLabel: '<span style="color:red;">*</span>权限类型',
                    store:'system.DictionaryStore',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    emptyText: '请选择',
                    editable:false,
                    allowBlank: false,
                    triggerAction: 'all'
                },{
                    fieldLabel: '<span style="color:red;">*</span>资源类型',
                    name: 'resource_type',
                    allowBlank: false,
                    maxLength: 255
                },{
                    xtype: 'numberfield',
                    fieldLabel: '排列顺序',
                    name: 'lo',
                    maxLength: 9
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