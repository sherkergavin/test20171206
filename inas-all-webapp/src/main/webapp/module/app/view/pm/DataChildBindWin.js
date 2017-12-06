Ext.define('inas.view.pm.DataChildBindWin',{
    extend : 'Ext.window.Window',
    requires: [
        'Jm.button.Button'
    ],
    alias : 'widget.dataChildBindWin',//别名
    config:{
        parent_id:null
    },
    initComponent : function () {
        var me = this;
        Ext.apply(this,{
            title: '新增子节点',
            height:160,
            width:400 ,
            layout: 'fit',
            modal : true,
            items:{
                xtype:'form',
                //url: 'save-form.php',
                layout: 'anchor',
                bodyPadding : 5,
                defaults: {
                    anchor: '95%',
                    margin: '5 0 0 5'
                },
                defaultType: 'textfield',
                items:
                    [
                        {xtype: 'hiddenfield', name: 'parent_id'},
                        {xtype: 'hiddenfield', name: 'id'},
                        {
                            labelWidth:100,
                            fieldLabel: '名称<span style="color:red;">*</span>',
                            name: 'name',
                            allowBlank: false,
                            maxLength: 255
                        },
                        {
                            xtype:'combo',
                            fieldLabel:'绑定类型<span style="color:red;">*</span>',
                            flex: 1,
                            //margin:'0 0 0 5',
                            name:'type',
                            store:Ext.create('Ext.data.Store', {
                                fields: ['id', 'name'],
                                data : [
                                    {"id":0, "name":"视图"},
                                    {"id":1, "name":"数据表"}
                                ]
                            }),
                            queryMode: 'local',
                            editable: false,
                            displayField: 'name',
                            valueField: 'id',
                            triggerAction: 'all',
                            allowBlank:false
                        },
                    ],

                buttons: [{
                    xtype: 'jbutton',
                    action:'add'
                }, {
                    xtype:'jbutton',
                    action:'reset'
                }]
            }
        })
        this.callParent(arguments);
    }
})