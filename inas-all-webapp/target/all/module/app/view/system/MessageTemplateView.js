Ext.define('inas.view.system.MessageTemplateView',{
    extend:'Ext.panel.Panel',
    alias:'widget.msgTempView',
    title:'短信模板',
    requires: [
        'Jm.button.Button'
    ],
    layout:'border',
    closable:true,
    items:[
        {
            xtype:'treepanel',
            name:'msgTempTree',
            region:'west',
            width:'18%',
            border: true,
            store: 'system.MsgTempTreeStore',
            rootVisible: false
        },
        {
            xtype:'form',
            method:'post',
            region:'center',
            border:true,
            name:'msgTempForm',
            layout: 'anchor',
            defaults: {
                    anchor: '99%',
                    margin:'5 10 10 10',
                    labelWidth:135
                },
            items:[
                {xtype:'hiddenfield',name:'id'},
                {
                    xtype:'textfield',
                    fieldLabel: '模板标题<span style="color:red;">*</span>',
                    maxLength:255,
                    maxLengthText:'最多可输入255个字符',
                    name: 'title',
                    allowBlank: false
                },
                {
                    xtype:'textarea',
                    fieldLabel:'模板内容<span style="color:red;">*</span>',
                    maxLength:2000,
                    maxLengthText:'最多可输入2000个字符',
                    name:'context'
                },
                {
                    xtype: 'numberfield',
                    miniValue:0,
                    fieldLabel: '排列顺序',
                    minValue: 0,
                    name: 'lo'
                }

            ]
        }
    ],
    buttons:[
        {
            xtype:'jbutton',
            action:'addTemp',
            text:'新增短信模板',
            iconCls:'add'
        },
        '->'
        ,
        {
            xtype:'jbutton',
            action:'save'
        },
        {
            xtype:'jbutton',
            action:'reset'
        }
    ]


});