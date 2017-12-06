/**
 * Created by luyufei on 2016/2/1.
 */

Ext.define('inas.view.home.FormCompleteView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.formcompleteview',
    overflowX:'auto',
    overflowY:'scroll',
    height: 300,

    requires: [
        'Jm.button.Button'
    ],

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            title: '办结事项',
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                //日期查询
                {
                    xtype: 'grid',
                    width: '88%',
                    region: 'center',
                    name:'taskInfoGrid',
                    border: true,
                    layout: 'fit',
                    store: Ext.create('inas.store.home.FormStartByMeStore'),
                    columns: [
                        {
                            text: '',
                            dataIndex: 'parentTaskId',
                            hidden: true
                        },
                        {
                            text: 'processDefinitionId',
                            dataIndex: 'processDefinitionId',
                            hidden: true
                        },{
                            text: '',
                            dataIndex: 'id',
                            hidden: true
                        },{
                            text: '',
                            dataIndex: 'executionId',
                            hidden: true
                        },{
                            text: '',
                            dataIndex: 'formKey',
                            hidden: true
                        },{
                            text: '',
                            dataIndex: 'taskDefinitionKey',
                            hidden: true
                        },{
                            text: '',
                            dataIndex: 'url',
                            hidden: true
                        },
                        {
                            text:'编号',
                            dataIndex:'processInstanceId',
                            editor: 'numberfield',
                            flex:1,
                            align:'center'
                        },
                        {
                            text: '名称',
                            dataIndex: 'name',
                            editor: 'textfield',
                            flex:1,
                            align: 'center'
                        },
                        {
                            text:'概述',
                            dataIndex:'context',
                            editor:'textfield',
                            flex:1,
                            align:'center'
                        },
                        {
                            text: '申请人',
                            dataIndex: 'startUser',
                            editor: 'textfield',
                            flex:1,
                            align: 'center'
                        }
                        ,
                        {
                            text: '填报单位',
                            dataIndex: 'fillUnit',
                            editor: 'textfield',
                            flex:1,
                            align: 'center'
                        },

                        {
                            text: '处理人',
                            dataIndex: 'assignee',
                            editor: 'textfield',
                            flex:1,
                            align: 'center',
                            hidden: true
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});