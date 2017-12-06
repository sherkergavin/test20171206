/**
 * Created by ZS on 2015/10/22.
 */
Ext.define('inas.view.workflow.ChongxiView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.chongxiView',
    overflowX:'auto',
    overflowY:'scroll',
    requires: [
        'Jm.button.Button'
    ],

    initComponent: function () {
        var me = this;
        me.wf_formType='FlushingProcess';
        me.fmStore = Ext.create('inas.store.workflow.WorkFlowInfosStore');
        var tbar = Ext.create("Ext.Toolbar", {
            align: 'center',
            region: 'north',
            height: '40',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '时间',
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
                    fieldLabel: '状态',
                    name: 'search_state',
                    xtype: 'combobox',
                    store: Ext.create('inas.store.system.DictionaryStore'),
                    emptyText: '请选择',
                    queryMode: 'query',
                    mode: 'local',
                    triggerAction: 'all',
                    displayField: 'name',
                    valueField: 'code',
                    editable: false,
                    allowBlank: false
                },
                {
                    xtype: 'jbutton',
                    action: 'search'
                },
                '->'
                ,
                {
                    xtype:'jbutton',
                    action:'add'
                }
            ]
        });

        Ext.apply(this, {
            title: '个人任务',
            layout: 'border',
            modal: true,
            defaults: {
                anchor: '100%'
            },
            items: [
                //日期查询
                tbar,
                {
                    xtype: 'grid',
                    width: '88%',
                    region: 'center',
                    name:'taskInfoGrid',
                    border: true,
                    layout: 'fit',
                    store: me.fmStore,
                    columns: [
                        {
                            text: '',
                            dataIndex: 'parentTaskId',
                            hidden: true
                        },
                        {
                            text: 'processDefinitionId',
                            dataIndex: 'processDefinitionId'
                            ,
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
                            text:'流程编号',
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
                            text: '处理人',
                            dataIndex: 'assignee',
                            editor: 'textfield',
                            flex:1,
                            align: 'center'
                        },
                        {
                            xtype: 'actioncolumn', align: 'center', text: '流程图详情',
                            items: [
                                {
                                    iconCls: 'search',
                                    tooltip: '流程图详情',
                                    handler: function (grid, rowIndex) {
                                        var record = grid.getStore().getAt(rowIndex);
                                        var wfUrl=wfproIp('/workflow/process/trace/auto/')
                                        if(null==record.get('executionId') || ''==record.get('executionId') ||0==record.get('executionId')){
                                            Jm.MessageBox.info("当前表单已完成，可双击查看详情!");
                                        }else{
                                            var window=Ext.create('Ext.window.Window', {
                                                title:'流程图',
                                                height: 700,
                                                width: 1200,
                                                layout: 'fit',
                                                modal:true,
                                                maximizable:true,
                                                //带节点输出
                                                html : '<iframe src="'+wfUrl+record.get('executionId')+'?executionId='+record.get('executionId')+ '&op=write" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>'
                                            });
                                            window.show();
                                        }
                                    }

                                }
                            ]
                        },
                        {
                            text:'签收时间',
                            dataIndex:'claimTime',
                            editor: 'textfield',
                            flex:1,
                            align:'center'
                        },

                        {
                            text: '开始时间',
                            dataIndex: 'startTime',
                            flex:1,
                            align: 'left',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                        }
                        ,
                        {
                            text: '结束时间',
                            dataIndex: 'endTime',
                            flex:1,
                            align: 'left',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                        },
                        {
                            text: '任务状态',
                            dataIndex: 'state',
                            editor: 'textfield',
                            flex:1,
                            align: 'center',
                            renderer:function(value){
                                if(value=='mine_turn'){
                                    return "<span style='color: #CC3333;font-weight:bold;'>待我审批</span>";
                                }
                                if(value=='finished'){
                                    return "<span style='color: #157fcc;font-weight:bold;'>审批结束</span>";
                                }
                                if(value=='running'){
                                    return "<span style='color: #274807;font-weight:bold;'>审批中</span>";
                                }
                                if(value=='forme_claim'){
                                    return "<span style='color : #e5872c;font-weight:bold;'>等待签收</span>";
                                }
                            }
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});