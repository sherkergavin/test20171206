Ext.define('inas.view.data.Group',{
    extend:'Ext.panel.Panel',
    alias:'widget.group',
    title:'用户组',
    layout:'border',
    closable:true,
    items:[
        {
            xtype:'treepanel',
            name:'db_TypeTree',
            region:'west',
            width:'18%',
            border: true,
            forceFit:true,
            store: 'data.GroupStore',
            rootVisible:false
        },//treepanel
        //form
        {
            xtype:'form',
            method:'post',
            region:'center',
            border:true,
            name:'db_external',
            layout: 'anchor',
            defaults: {
                anchor: '98%',
                margin:'5 10 0 10',
                labelWidth:120
            },
            items:[
                {xtype:'hiddenfield',name:'id'},//上右下左
                {xtype:'textfield',fieldLabel:'用户组名称',name:'name',maxLength:255,maxLengthText:'最多可输入255个字符'},
                {
                    xtype:'combo',fieldLabel:'隶属<span style="color:red;">*</span>',
                    name:'parent_id',
                    store:'data.AllGroupStore',
                    queryMode:'local',
                    displayField:'name',
                    valueField:'id',
                    emptyText:'请选隶属用户',
                    editable:false,
                    triggerAction:'all',
                    allowBlank:false
                },
                {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序<span style="color:red;">*</span>',minValue: 0, name: 'lo',allowBlank: false,maxLength:9,maxLengthText:'最多可输入9个字符'},
                {xtype:'textarea',fieldLabel:'备注',name:'description',maxLength:2000,maxLengthText:'最多可输入2000个字符'}
            ]
        }
    ],
    buttons:[
        {
            xtype:'jbutton',
            action:'add',
            text:'新增采集任务',
            iconCls:'add'
        },//增加
        {
            xtype:'jbutton',
            action:'delete'
        },//删除
        '->'
        ,
        {
            xtype:'button',
            action:'testSource',
            text:'测试'
        },
        {
            xtype:'jbutton',
            action:'save'
        },//保存
        {
            xtype:'jbutton',
            action:'reset'
        }
    ]


});