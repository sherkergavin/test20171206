/**
 * Created by luyufei on 2016/3/23.
 */
Ext.define('inas.view.workflow.FamenCaozuoNewView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.famenNewView',
    overflowX:'auto',
    overflowY:'scroll',
    requires: [
        'Jm.button.Button'
    ],

    initComponent: function () {
        var me = this;
        me.wf_formType='ValveOperationProcess';
        me.stateStore = Ext.create('inas.store.workflow.FormStateStore');
        var tbar = Ext.create("Ext.Toolbar", {
            columns: 6,
            align: 'center',
            region: 'north',
            height: '40',
            items: [
                {
                    xtype:'panel',
                    layout: {
                        type: 'table',
                        columns: 7
                    },
                    items:[
                        {//Table行1
                            xtype: 'datetimefield',
                            fieldLabel: '计划时间',
                            labelAlign: 'right',
                            name: 'search_startTime',
                            labelWidth: 60,
                            //editable: false,
                            format: 'Y-m-d H:i',
                            value : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -3), 'Y-m-d H:i')
                        },
                        {
                            xtype: 'datetimefield',
                            fieldLabel: '至',
                            labelAlign: 'right',
                            labelWidth: 25,
                            name: 'search_endTime',
                            //editable: false,
                            format: 'Y-m-d H:i',
                            value : Ext.Date.format(new Date(), 'Y-m-d H:i')
                        },
                        {
                            fieldLabel: '过程控制',
                            name: 'search_state',
                            labelAlign: 'right',
                            xtype: 'combobox',
                            labelWidth: 65,
                            store: Ext.create('Ext.data.ArrayStore', {
                                fields: [{
                                    name: 'id'
                                }, {
                                    name: 'name'
                                }],
                                data: [['1', '待我审批'], ['2', '审批中'], ['3', '准备中'], ['4', '正在进行'], ['5', '已完成']]
                            }),
                            emptyText: '请选择',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            editable: false,
                            allowBlank: false
                        }
                        ,
                        {
                            fieldLabel: '工作内容',
                            labelWidth: 65,
                            labelAlign: 'right',
                            name: 'search_Context',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位',
                            labelAlign: 'right',
                            labelWidth: 65,
                            name: 'search_unit',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点',
                            labelAlign: 'right',
                            labelWidth: 65,
                            name: 'search_place',
                            xtype: 'textfield'
                        }
                        ,
                        {
                            fieldLabel: '类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型',
                            name: 'search_type',
                            labelAlign: 'right',
                            xtype: 'combobox',
                            labelWidth: 65,
                            store: Ext.create('Ext.data.ArrayStore', {
                                fields: [{
                                    name: 'id'
                                }, {
                                    name: 'name'
                                }],
                                data: [['1', '调度令'], ['2', '操作单']]
                            }),
                            emptyText: '请选择',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            editable: false,
                            allowBlank: false
                        }
                        ,
                        {//Table行2
                            xtype: 'datetimefield',
                            fieldLabel: '实际时间',
                            labelAlign: 'right',
                            name: 'search_actual_start_date',
                            labelWidth: 60,
                            //editable: false,
                            format: 'Y-m-d H:i'
                        },
                        {
                            xtype: 'datetimefield',
                            fieldLabel: '至',
                            labelAlign: 'right',
                            labelWidth: 25,
                            name: 'search_actual_end_date',
                            //editable: false,
                            format: 'Y-m-d H:i'
                        },
                        {
                            fieldLabel: '来电情况',
                            labelAlign: 'right',
                            name: 'search_phone',
                            xtype: 'combobox',
                            labelWidth: 65,
                            store: Ext.create('Ext.data.ArrayStore', {
                                fields: [{
                                    name: 'id'
                                }, {
                                    name: 'name'
                                }],
                                data: [['1', '操作前来电'], ['2', '操作后来电'], ['3', '完成工作内容前来电'], ['4', '完成操作内容后来电']]
                            }),
                            emptyText: '请选择',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            editable: false,
                            allowBlank: false
                        },
                        {
                            fieldLabel: '口&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;径',
                            labelAlign: 'right',
                            labelWidth: 65,
                            name: 'search_dn',
                            regex : /^\+?[1-9]\d*$/,
                            regexText : '必须为正数且大于0',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '局调度监测中心',
                            labelAlign: 'right',
                            width:232,
                            name: 'search_mc',
                            xtype: 'combobox',
                            labelWidth: 110,
                            store: Ext.create('Ext.data.ArrayStore', {
                                fields: [{
                                    name: 'id'
                                }, {
                                    name: 'name'
                                }],
                                data: [['1', '是'], ['2', '否']]
                            }),
                            emptyText: '请选择',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            editable: false,
                            allowBlank: false
                        },
                        {
                            fieldLabel: '编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号',
                            labelAlign: 'right',
                            labelWidth: 65,
                            name: 'search_code',
                            xtype: 'textfield'
                        },
                        {
                            xtype:'panel',
                            colspan:2,
                            layout: {type: 'table',columns:6 },
                            items:[
                                {
                                    width:60
                                },
                                {
                                    xtype: 'jbutton',
                                    id:'search',
                                    action: 'search'
                                },
                                {
                                    width:20
                                },
                                ,
                                {//阀门操作单新增按钮所在
                                    xtype: 'jbutton',
                                    id: 'fmAdd',
                                    action: 'add'
                                },
                                {
                                    width:50
                                }
                            ]
                        }
                    ]
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
                    forceFit : true,
                    store:  'workflow.FamenCaozuoStore',
                    columns: [
                        {
                            text:'工程编号',
                            dataIndex:'code',
                            //editor: 'numberfield',
                            align:'center'
                        },
                        {
                            text: '工程类型',
                            dataIndex: 'type',
                            //editor: 'textfield',
                            //flex:1,
                            align: 'center',
                            renderer:function(value){
                                if(value==1){
                                    return "操作单";
                                }else{
                                    return "调度令";
                                }
                            }
                        },
                        //{
                        //    text:'计划开始时间',
                        //    dataIndex:'planing_start_date',
                        //    //editor:'textfield',
                        //    flex:1,
                        //    align:'center',
                        //    renderer:Ext.util.Format.dateRenderer('Y-m-d')
                        //},
                        //{
                        //    text: '计划完成时间',
                        //    dataIndex: 'planing_end_date',
                        //    //editor: 'textfield',
                        //    flex:1,
                        //    align: 'center',
                        //    renderer:Ext.util.Format.dateRenderer('Y-m-d')
                        //},
                        //{
                        //    text:'实际开始时间',
                        //    dataIndex:'actual_start_date',
                        //    //editor:'textfield',
                        //    flex:1,
                        //    align:'center',
                        //    renderer:Ext.util.Format.dateRenderer('Y-m-d')
                        //},
                        //{
                        //    text: '实际完成时间',
                        //    dataIndex: 'actual_end_date',
                        //    editor: 'textfield',
                        //    flex:1,
                        //    align: 'center',
                        //    renderer:Ext.util.Format.dateRenderer('Y-m-d')
                        //},
                        {
                            text:'单位',
                            dataIndex:'fill_unit',
                            editor: 'textfield',
                            align:'center'
                        },

                        {
                            text: '工程内容',
                            dataIndex: 'job_content',
                            align: 'center'
                        },
                        {
                            text: '过程控制',
                            dataIndex: 'status',
                            align: 'center'
                        },
                        {
                            text: '是否报调度中心',
                            dataIndex: 'is_monitoring_center',
                            align: 'center',
                            renderer:function(value){
                                if(value==1){
                                    return "是";
                                }else{
                                    return "否";
                                }
                            }
                        }
                        ,
                        {
                            xtype: 'actioncolumn', align: 'center', text: '操作',id:'fmOperation',
                            items: [
                                {
                                    iconCls: 'search',
                                    align: 'center',
                                    tooltip: '查看',
                                    handler: function(grid, rowIndex, colIndex, item) {
                                        this.up('grid').fireEvent('itemselectbuttonclick', grid, rowIndex, colIndex);
                                    },
                                    style:'margin-right:20px;'
                                },{

                                },
                                {
                                    iconCls: 'edit',
                                    align: 'center',
                                    tooltip: '审批/修改',
                                    handler: function(grid, rowIndex, colIndex, item) {
                                        this.up('grid').fireEvent('itemeditbuttonclick', grid, rowIndex, colIndex);
                                    },
                                    style:'margin-right:20px;'
                                }, {

                                },
                                {
                                    iconCls: 'delete',
                                    align: 'center',
                                    tooltip: '删除',
                                    handler: function(grid, rowIndex, colIndex, item) {
                                        this.up('grid').fireEvent('itemdeletebuttonclick', grid, rowIndex, colIndex);
                                    }
                                }
                            ]
                        }
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        emptyMsg:"没有数据",
                        store: 'workflow.FamenCaozuoStore'
                    }
                }
            ],initComponent: function() {
                // register custom events
                this.addEvents('itemselectbuttonclick','itemeditbuttonclick','itemdeletebuttonclick');
            }
        });
        this.callParent(arguments);
    }
});