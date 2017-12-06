/**
 * Created by zs on 2015/8/13.
 */
Ext.define('inas.view.system.MessageHistoryView', {
    extend: 'Ext.panel.Panel',
    closable: true,
    alias: 'widget.mesageHistoryView',
    initComponent: function () {
        var me = this;
        me.tbar = Ext.create('Ext.Toolbar', {
            name: 'middleToolbar',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '发送时间',
                    name: 'search_startTime',
                    labelWidth: 30,
                    editable: false,
                    format: 'Y-m-d',
                    value : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -3), 'Y-m-d')
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '至',
                    labelWidth: 20,
                    name: 'search_endTime',
                    editable: false,
                    format: 'Y-m-d',
                    value : Ext.Date.format(new Date(), 'Y-m-d')
                },
                {
                    fieldLabel: '短信内容',
                    name: 'search_Context',
                    xtype: 'textfield'
                },
                 {
                    xtype: 'jbutton',
                    action: 'search'
                }]
        });


        Ext.apply(this, {
            title: '短信发送',
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            tbar:me.tbar,
            items: [
                {
                    xtype:'grid',
                    border: true,
                    region: 'north',
                    height: '65%',
                    name: 'messageGrid',
                    store: 'system.MessageHistoryStore',
                    columns: [
                        {
                            text: '发送时间',
                            dataIndex: 'sendDate',
                            align: 'center',
                            flex: 1,
                            renderer: function (value) {
                                if(value!=null && value!='' && value!=0){
                                    return Ext.Date.format(new Date(value),'Y-m-d H:i:s');
                                }else{
                                    return null;
                                }
                            }
                        },
                        {text: '短信内容', dataIndex: 'context', align: 'center',flex: 2},
                        {text: '收件人', dataIndex: 'recipient', align: 'center', flex: 1},
                        {text: '所在群组', dataIndex: 'messageGroupName', align: 'center', flex: 1},
                        {text: '所在群组', dataIndex: 'message_group_id', hidden:true}
                    ]
                },
                {
                    xtype:'form',
                    method:'post',
                    region: 'center',
                    border:true,
                    layout:'anchor',
                    bodyPadding: 5,
                    defaults: {
                        anchor: '95%',
                        margin: '5 0 0 5'
                    },
                    items:[
                        {
                            xtype:'container',
                            name:'accepters',
                            layout:'hbox',
                            items:[
                                {
                                    xtype: 'combo',
                                    fieldLabel: '选择收件组',
                                    name: 'message_group_id',
                                    store: 'data.AllMessageGroupStore',
                                    queryMode: 'local',
                                    displayField: 'text',
                                    valueField: 'id',
                                    editable: false
                                },
                                {
                                    xtype:'textfield',
                                    fieldLabel: '输入号码',
                                    regex: /^[1]\d{10}$/,
                                    regexText:'请正确输入11位的手机号码',
                                    maxLength: 13,
                                    name:'recipient'
                                }
                                ,
                                {
                                    xtype: 'combo',
                                    fieldLabel: '选择要使用的短信模板',
                                    name: 'templateConbo',
                                    store: 'system.MessageTemplateStore',
                                    queryMode: 'local',
                                    displayField: 'title',
                                    valueField: 'id',
                                    editable: false
                                },
                            ]
                        },
                        {
                            xtype:'textarea',
                            fieldLabel:'消息',
                            allowBlank: false,
                            name:'context'
                        }
                    ]
                    ,
                    buttons: [
                        '->',
                        {
                            xtype: 'jbutton',
                            action: 'submit',
                            name:'groupSend',
                            text:'群组发送'
                        },
                        {
                            xtype:'jbutton',
                            action:'submit',
                            name:"singleSend",
                            text:'单个号码发送'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});