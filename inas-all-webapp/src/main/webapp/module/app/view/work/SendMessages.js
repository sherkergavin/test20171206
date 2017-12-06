/**
 * Created by ZS on 2015/7/30.
 */
Ext.define('inas.view.work.SendMessages',{
    extend:'Ext.panel.Panel',
    alias:'widget.messageForm',
    title:'发送短信',
    margin:'30 0 0 0',
    layout:'fit',
    items:[
        //form
        {
            xtype:'form',
            method:'post',
            border:false,
            //layout: 'anchor',
            //defaults: {
            //    anchor: '98%',
                margin:'5 10 0 30',
            //    labelWidth:120
            //},
            items:[
                {
                    xtype: 'combo',
                    fieldLabel: '选择收件组<span style="color:red;">*</span>',
                    name: 'messageGroup',
                    store: 'work.AllMessageGroupStore',
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'id',
                    allowBlank: false,
                    anchor: '98%',
                    editable: false
                },
                {
                    xtype:'container',
                    name:'accepters',
                    editable:false,
                    anchor: '98%',
                    items:[]
                },
                {
                    xtype:'textarea',
                    fieldLabel:'消息',
                    anchor: '98%',
                    allowBlank: false,
                    name:'text'
                },
                {
                    xtype:'button',
                    fieldLabel:'发送',
                    anchor: '8%',
                    text:'发送'
                }
            ]

        }


    ]
});


