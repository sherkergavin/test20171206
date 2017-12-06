Ext.define('inas.view.data.CollectTask',{
    extend:'Ext.panel.Panel',
    requires: [
        'Jm.button.Button',
        'Jm.ux.DateTimeField'
    ],
    alias:'widget.collect',
    title:'采集任务',
    layout:'border',
    closable:true,
    items:[
        {
            xtype:'treepanel',
            name:'db_TypeTree',
            region:'west',
            width:'18%',
            forceFit:true,
            border: true,
            store: 'pm.CollectTaskStore',
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
                {xtype:'textfield',fieldLabel: '采集任务名称<span style="color:red;">*</span>',name: 'name',allowBlank: false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {
                    xtype:'combo',fieldLabel:'采集数据源<span style="color:red;">*</span>',
                    name:'ext_db_id',
                    store:'pm.AllExternalStore',
                    queryMode:'local',
                    displayField:'name',
                    valueField:'id',
                    emptyText:'请选采集数据源',
                    editable:false,
                    allowBlank:false,
                    triggerAction:'all'
                },
                {xtype:'textfield',fieldLabel:'数据源表名<span style="color:red;">*</span>',name:'db_table_code',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {xtype:'textfield',fieldLabel:'采集键列名<span style="color:red;">*</span>',name:'db_key_code',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {xtype:'textfield',fieldLabel:'数据值列名<span style="color:red;">*</span>',name:'db_data_value_code',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {xtype:'textfield',fieldLabel:'数据生成时间列名<span style="color:red;">*</span>',name:'db_data_time_code',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},
                {xtype:'textfield',fieldLabel:'数据入库时间列名<span style="color:red;">*</span>',name:'db_data_record_time_code',allowBlank:false,maxLength:255,maxLengthText:'最多可输入255个字符'},

                {
                    xtype: 'datetimefield',
                    //xtype: 'datefield',
                    //anchor: '100%',
                    fieldLabel: '下次采集时间<span style="color:red;">*</span>',
                    name: 'start',
                    editable: false,
                    allowBlank:false,
                    format : 'Y-m-d H:i:s'
                //    value:new Date(1359960250298)
                },
                //{xtype:'numberfield',fieldLabel:'调度时间间隔(m)<span style="color:red;">*</span>',name:'time_unit',allowBlank:false,maxLength:9,maxLengthText:'最多可输入9个字符'},
                {xtype:'numberfield',fieldLabel:'调度时间间隔(m)<span style="color:red;">*</span>',name:'time_period',allowBlank:false,maxLength:9,maxLengthText:'最多可输入9个字符'},
                {
                    xtype:'combo',
                    fieldLabel:'数据块<span style="color:red;">*</span>',
                    flex: 1,
                    //margin:'0 0 0 5',
                    name:'block_data',
                    store:Ext.create('Ext.data.Store', {
                        fields: ['id', 'name'],
                        data : [
                            {"id":1, "name":"块状数据"},
                            {"id":2, "name":"单条数据"}
                        ]
                    }),
                    queryMode: 'local',
                    editable: false,
                    displayField: 'name',
                    valueField: 'id',
                    triggerAction: 'all',
                    allowBlank:false
                },
                {xtype: 'numberfield', miniValue:0,fieldLabel: '排列顺序',minValue: 0, name: 'lo',allowBlank: false,maxLength:9,maxLengthText:'最多可输入9个字符'},
                {xtype:'textarea',fieldLabel:'备注',name:'description',maxLength:2000,maxLengthText:'最多可输入2000个字符'}
            ]
        },

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
            name:'testSource',
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