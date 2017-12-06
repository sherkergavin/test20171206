Ext.define('inas.view.pm.ExternalDB',{
    extend:'Ext.panel.Panel',
    alias:'widget.external',
    title:'数据采集',
    layout:'border',
    closable:true,
    requires: [
        'Jm.button.Button'
    ],
    items:[
        {
            xtype:'treepanel',
            name:'db_TypeTree',
            region:'west',
            width:'18%',
            border: true,
            forceFit:true,
            store: 'pm.ExternalDBStore',
            rootVisible: false
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
                {xtype:'textfield',fieldLabel: '任务名称<span style="color:red;">*</span>',name: 'name',allowBlank: false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {xtype:'textfield',fieldLabel:'数据库名字<span style="color:red;">*</span>',name:'connect_name',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {xtype:'textfield',fieldLabel:'用户名<span style="color:red;">*</span>',name:'connect_user',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {xtype:'textfield',fieldLabel:'密码<span style="color:red;">*</span>',name:'connect_password',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                //{xtype:'textfield',fieldLabel:'数据库类型',name:'db_type_id'},
                {xtype:'textfield',fieldLabel:'连接类型',name:'connect_type',maxLength:2,maxLengthText:'最多可输入2个字符'},
                //{xtype:'textfield',fieldLabel:'数据库类型',name:'type_name'},
                {
                    xtype:'combo',fieldLabel:'数据库类型<span style="color:red;">*</span>',name:'db_type_id',
                    store:'pm.AllDBTypeStore',
                    queryMode:'local',
                    displayField:'name',
                    valueField:'id',
                    emptyText:'请选择数据库类型',
                    editable:false,
                    triggerAction:'all',
                    allowBlank:false
                },
                {xtype:'textfield',fieldLabel:'数据库服务器<span style="color:red;">*</span>',name:'connect_server',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                //{xtype:'textfield',fieldLabel:'最大连接数',name: 'max_active_connect',maxLength:9,maxLengthText:'最多可输入9个字符'},
                //{xtype:'textfield',fieldLabel:'最大空闲时间(m)',name: 'max_idle_time',maxLength:9,maxLengthText:'最多可输入9个字符'},
                //{xtype:'textfield',fieldLabel:'最大等待时间(m)',name:'max_wait_time',maxLength:9,maxLengthText:'最多可输入9个字符'},
                {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序',minValue: 0, name: 'lo',maxLength:9,maxLengthText:'最多可输入9个字符'},
                {xtype:'textarea',fieldLabel:'备注',name:'description',maxLength:2000,maxLengthText:'最多可输入2000个字符'}
            ]
        }
    ],
    buttons:[
        {
            xtype:'jbutton',
            action:'add'
        },//增加
        {
            xtype:'jbutton',
            action:'delete'
        },//删除
        '->'
        ,
        {
            xtype:'jbutton',
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