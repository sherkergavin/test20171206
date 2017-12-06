Ext.define('inas.view.data.CategoryWindow',{
	extend : 'Ext.window.Window',
	alias : 'widget.CategoryWindow',//别名
	initComponent : function () {
		var me = this;
		Ext.apply(this,{
            title: '新增站点类型',
            height: 400,
            width: 400,
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
                items: [ {xtype: 'hiddenfield', name: 'id'},{
                    labelWidth:50,
                    fieldLabel: '编码<span style="color:red;">*</span>',
                    name: 'code',
                    allowBlank: false,
                    maxLength: 255
                },{
                    labelWidth:50,
                    fieldLabel: '名称<span style="color:red;">*</span>',
                    name: 'name',
                    allowBlank: false,
                    maxLength: 255
                },{
                        labelWidth:50,
                        xtype: 'combo',
                        fieldLabel: '类型<span style="color:red;">*</span>',
                        name: 'category',
                        store: Ext.create('inas.store.system.DictionaryStore'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        //hiddenName: 'category',
                        allowBlank: false,
                        editable: false

                    },

                    {
                        labelWidth:50,
                        fieldLabel: '排序<span style="color:red;">*</span>',
                        name: 'lo',
                        xtype: 'numberfield',
                        allowDecimals:false,
                        decimalPrecision:0,
                        maxValue:999999999,
                        minValue:0,
                        allowBlank: false
                    }, {
                        labelWidth:50,
                        fieldLabel: '备注',
                        name: 'description',
                        xtype: 'textarea',
                        maxLength: 2000
                    }],

                buttons: [  { xtype: 'jbutton',
                    action:'save'
                },
                    ,
                    { xtype: 'jbutton',
                        action:'reset'

                    },
                   ]
            }
        })
		this.callParent(arguments);
	}
})