/**
 * Created by ZS on 2015/10/22.
 */
Ext.define('inas.view.workflow.ShebeiTingyiView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.shebeiView',
    overflowX:'auto',
    overflowY:'scroll',
    requires: [
        'Jm.button.Button'
    ],

    initComponent: function () {
        var me = this;
        //me.wf_formType='TingyiPermissionProcess';
        me.wf_formType='TestStopEquipmentProcess';
        me.fmStore = Ext.create('inas.store.workflow.WorkFlowInfosStore');
        var  orgCombStore=Ext.create('inas.store.system.OrganiztionStore',{
            autoLoad:true
        });
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
                    labelWidth: 30,
                    store: Ext.create('inas.store.system.DictionaryStore',{
                    listeners:{
                        load:function(store){
                            var nullValue = {
                                id: null,
                                name: '空'
                            };
                            store.insert(0, nullValue);
                        }
                    }
                }),
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
                    fieldLabel: '单位',
                    name: 'search_unit',
                    xtype: 'combobox',
                    labelWidth: 30,
                    store: Ext.create('inas.store.system.OrganiztionStore',{
                        listeners:{
                           load:function(store){
                               var nullValue = {
                                   id: null,
                                   name: '空'
                               };
                               store.insert(0, nullValue);
                           }
                        }
                    }),
                    emptyText: '请选择',
                    queryMode: 'query',
                    mode: 'local',
                    triggerAction: 'all',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    allowBlank: false
                },
                //{
                //    fieldLabel: '单位',
                //    name: 'search_unit',
                //    xtype: 'textfield'
                //},
                {
                    fieldLabel: '概述',
                    name: 'search_Context',
                    labelWidth: 30,
                    xtype: 'textfield'
                },
                {
                    xtype: 'jbutton',
                    action: 'search'
                }  ,
                '->',
                {
                    xtype: 'jbutton',
                    text: '新增设备停役单',
                    action: 'add'
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
                            text:'工程编号',
                            dataIndex:'code',
                            editor: 'textfield',
                            flex:1,
                            align:'center'
                        },
                        {
                            text: '单位',
                            dataIndex: 'fill_unit',
                            editor: 'textfield',
                            flex:1,
                            align: 'center'
                        },
                        {
                            text:'工程内容',
                            dataIndex:'job_content',
                            editor:'textfield',
                            flex:1,
                            align:'center'
                        },
                        {
                            text:'过程控制',
                            dataIndex:'status',
                            editor:'textfield',
                            flex:1,
                            align:'center'
                        },
                        //{
                        //    text: '填报单位',
                        //    dataIndex: 'fillUnit',
                        //    flex:1,
                        //    align: 'center',
                        //    hidden: true,
                        //    editor: new Ext.form.field.ComboBox({
                        //        typeAhead:true,
                        //        //readOnly:true,
                        //        queryMode:'local',
                        //        id:'id',
                        //        triggerAction:'all',
                        //        valueField:'id',
                        //        displayField:'name',
                        //        store:orgCombStore,
                        //        lazyRender:true
                        //    }) ,
                        //    renderer: function(value,metadata,record){
                        //        var index = orgCombStore.find('id',value);
                        //        if(index!=-1){
                        //            var te=orgCombStore.getAt(index).data.name;
                        //            return te;
                        //        }
                        //        return value;
                        //    }
                        //},
                        {
                            text: '是否送往中心审批',
                            dataIndex: 'is_monitoring_center',
                            editor: 'textfield',
                            flex:1,
                            align: 'center',
                            renderer:function(value) {
                                if (value == 1 ||value == '1') {
                                    return "是";
                                }
                                if (value == 2 ||value == '2' ) {
                                    return "否";
                                }
                            }
                        },
                        {
                            text: '开始时间',
                            dataIndex: 'planing_start_date',
                            flex:1,
                            align: 'left',
                            hidden: true,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                        }
                        ,
                        {
                            text: '结束时间',
                            dataIndex: 'planing_end_date',
                            flex:1,
                            align: 'left',
                            hidden: true,
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                        },
                        {
                            xtype: 'actioncolumn', align: 'center', text: '操作',flex:1,
                            items: [
                                {
                                    iconCls: 'search',
                                    align: 'center',
                                    tooltip: '查看',
                                    handler: function(grid, rowIndex, colIndex, item) {
                                        this.up('grid').fireEvent('itemviewbuttonclick', grid, rowIndex, colIndex);
                                    },
                                    style:'margin-right:20px;'
                                },{

                                },{
                                    iconCls: 'edit',
                                    align: 'center',
                                    tooltip: '审批/修改',
                                    id:'update',
                                    handler: function(grid, rowIndex, colIndex, item) {
                                        this.up('grid').fireEvent('itemeditbuttonclick', grid, rowIndex, colIndex);
                                    },
                                    style:'margin-right:20px;'
                                },
                                {

                                },
                                {
                                    iconCls: 'delete',
                                    align: 'center',
                                    tooltip: '删除',
                                    id:'delete',
                                    handler: function(grid, rowIndex, colIndex, item) {
                                        this.up('grid').fireEvent('itemdeletebuttonclick', grid, rowIndex, colIndex);
                                    }
                                }
                            ]

                        },
                    ]
                //    ,initComponent: function() {
                //    // register custom events
                //    this.addEvents( 'itemeditbuttonclick');
                //}
                }
            ]
                ,initComponent: function() {
                // register custom events
                this.addEvents( 'itemeditbuttonclick','itemdeletebuttonclick','itemviewbuttonclick');
            }
        });
        this.callParent(arguments);
    }
});