Ext.define('inas.view.pm.DataRootWindow',{
	extend : 'Ext.window.Window',
	alias : 'widget.dataRootWindow',//别名
    requires: [
        'Jm.button.Button'
    ],
	initComponent : function () {
		var me = this;
		Ext.apply(this,{
            title: '添加根目录',
            height:120 ,
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
                        {xtype: 'hiddenfield', name: 'id'},
                        {
                            labelWidth:50,
                            fieldLabel: '名称',
                            name: 'name',
                            allowBlank: false,
                            maxLength: 255
                        },
                        {
                            xtype:'radiogroup',
                            fieldLabel:'绑定类型',
                            columns:2,
                            name:'group',
                            vertical:false,
                            hidden:true,
                            items:[
                                {boxLabel:'视图',name:'type',inputValue:'0',checked: true},
                                {boxLabel:'数据表',name:'type',inputValue:'1'}
                            ]
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