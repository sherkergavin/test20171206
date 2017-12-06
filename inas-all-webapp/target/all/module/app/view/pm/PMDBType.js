Ext.define('inas.view.pm.DBType',{
    extend:'Ext.panel.Panel',
    alias:'widget.dbtypePanel',
    title:'数据源类型',
    requires: [
        'Jm.button.Button'
    ],
    layout:'border',
    closable:true,
    items:[
        {
            xtype:'treepanel',
            name:'db_TypeTree',
            region:'west',
            width:'18%',
            border: true,
            store: 'pm.DBTypeStore',
            rootVisible: false
        },//treepanel
        //form
        {
            xtype:'form',
            method:'post',
            region:'center',
            border:true,
            name:'db_source',
            layout: 'anchor',
            defaults: {
                    anchor: '99%',
                    margin:'5 10 10 10',
                    labelWidth:135
                },
            items:[
                {xtype:'hiddenfield',name:'id'},//上右下左
                {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'comSet',border:false,
                    items:[
                        {xtype:'combo',flex: 1,fieldLabel:'数据源类型<span style="color:red;">*</span>',value:'关系型数据库',labelWidth:135,slabelWidth:1,editable: false,allowBlank:false},
                        {
                            xtype:'combo',flex: 1,name:'data_source_type',margin:'0 0 0 5',
                            store:'pm.AllSourceTypeStore',
                            queryMode: 'local',
                            editable: false,
                            displayField: 'name',
                            valueField: 'id',
                            triggerAction: 'all',
                            allowBlank:false
                        }
                    ]
                },
                {xtype:'textfield',fieldLabel: '数据源名称<span style="color:red;">*</span>',readOnly:true,
                    maxLength:255,maxLengthText:'最多可输入255个字符',name: 'name',allowBlank: false},
                {xtype:'textfield',fieldLabel: '数据库服务器驱动<span style="color:red;">*</span>',readOnly:true,
                    maxLength:255,maxLengthText:'最多可输入255个字符',name: 'driver_name',allowBlank:false},
                {xtype:'textfield',fieldLabel: '数据库名称/路径/DSN<span style="color:red;">*</span>',readOnly:true,
                    maxLength:255,maxLengthText:'最多可输入255个字符',name: 'connect_url',allowBlank:false},
                {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序',minValue: 0, name: 'lo'},
                {xtype:'textarea',fieldLabel:'描述',maxLength:2000,maxLengthText:'最多可输入2000个字符',name:'description'}
            ]
        }
    ],
    buttons:[
        {
            xtype:'jbutton',
            action:'addSource',
            text:'新增数据源类型',
            iconCls:'add'
        },//增加
        //{
        //    xtype:'jbutton',
        //    action:'delete'
        //},
        '->'
        ,
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