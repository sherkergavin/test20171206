/**
 * Created by ZS on 2015/7/30.
 */
Ext.define('inas.view.workflow.ShebeiTingyiWin',{
    extend:'Ext.window.Window',
    alias: 'widget.ShebeiTingyiWin',
    requires: ["Ext.ux.TreePicker"],
    config: {
        taskKey: '',
        taskId:0,
        procId:0,
        imgPath:'',
        docPath:'',
        taskState:null
    },
    initComponent:function(){
        var me=this;
        me.wf_formType='TestStopEquipmentProcess';
        me.stCombo=Ext.create('inas.store.system.OrganiztionStore');
        Ext.apply(this,{
            title:'',
            width:'80%',
            height:'98%',
            margin:'0,0,15,0',
            buttonAlign:'center',
            resizable:false,
            autoScroll : true,
            modal:true,
            items:[
                {
                    xtype:'form',
                    layout: 'anchor',
                    name:'sbtyForm',
                    bodyPadding : 5,
                    defaults: {
                        anchor: '95%',
                        margin: '5 0 5 5'

                    },
                    tbar: [
                        '->',
                        { xtype: 'jbutton', action:'print', text: '打印工单'}
                    ],
                    items:
                        [
                            {
                                xtype:'hiddenfield',
                                name:'processDefinitionId'
                            },
                            {
                                xtype:'hiddenfield',
                                name:'procDefKey'
                            },
                            {
                                xtype:'hiddenfield',
                                name:'taskId'
                            },
                            {
                                xtype:'hiddenfield',
                                name: 'taskKey'
                            },
                            {
                                xtype:'hiddenfield',
                                name:'approve'
                            },
                            //一行两列
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h1',border:false,
                                items:[
                                    {
                                        xtype:'datefield',
                                        fieldLabel:'填报日期<span style="color:red;">*</span>',
                                        name:'filingDate',
                                        allowBlank: false,
                                        editable: false,
                                        flex: 1,
                                        value : Ext.Date.clone(new Date()),
                                        format:'Y-m-d'
                                    },
                                    {
                                        xtype:'textfield',flex: 1,
                                        name:'code',
                                        fieldLabel:'单号<span style="color:red;">*</span>',
                                        allowBlank: false,
                                        maxLength: 255
                                    }
                                ]
                            },
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h2',border:false,
                                items:[
                                    {
                                        xtype: 'treepicker',
                                        name: 'fillUnit',
                                        valueField: 'id',
                                        displayField: 'text',
                                        allowBlank: false,
                                        fieldLabel: '填报单位<span style="color:red;">*</span>',
                                        value: 'id',
                                        forceSelection: true,
                                        rootVisible: false,//是否启用默认设置的root节点
                                        store: Ext.create('Ext.data.TreeStore', {
                                            proxy: {
                                                type: 'ajax',
                                                actionMethods: {
                                                    create: "POST", read: "POST", update: "POST", destroy: "POST"
                                                },
                                                url: projectGP('/organization/getOrgsTree')
                                            }
                                            ,
                                            //设置根节点
                                            root: {
                                                text: '全市',
                                                id: 'root'
                                            }
                                        })
                                    },
                                    {
                                        xtype:'textfield',flex: 1,
                                        name:'jobOverview',
                                        fieldLabel:'工作概述<span style="color:red;">*</span>',
                                        //allowBlank: false,
                                        maxLength: 255
                                    }
                                ]
                            },
                            //{xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h3',border:false,
                            //    items:[
                            //        {
                            //            xtype:'datefield',
                            //            fieldLabel:'工作开始日期<span style="color:red;">*</span>',
                            //            name:'WorkStarTime',
                            //            //allowBlank: false,
                            //            editable: false,
                            //            flex: 1,
                            //            value : Ext.Date.clone(new Date()),
                            //            format:'Y-m-d'
                            //        },
                            //        {
                            //            xtype:'datefield',
                            //            fieldLabel:'工作结束日期<span style="color:red;">*</span>',
                            //            name:'WorkOverTime',
                            //            //allowBlank: false,
                            //            editable: false,
                            //            flex: 1,
                            //            value : Ext.Date.clone(new Date()),
                            //            format:'Y-m-d'
                            //        }
                            //    ]
                            //},
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'time1',border:false,
                                items:[
                                    {
                                        xtype:'datefield',
                                        fieldLabel:'计划开始日期<span style="color:red;">*</span>',
                                        name:'scheduled_start_date',
                                        editable: false,
                                        flex: 1,
                                        allowBlank: false,
                                        //value : Ext.Date.clone(new Date()),
                                        format:'Y-m-d'
                                    },
                                    {
                                        xtype:'datefield',
                                        fieldLabel:'计划结束日期<span style="color:red;">*</span>',
                                        name:'scheduled_end_date',
                                        editable: false,
                                        flex: 1,
                                        allowBlank: false,
                                        //value : Ext.Date.clone(new Date()),
                                        format:'Y-m-d'
                                    }
                                ]
                            },
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'time2',border:false,
                                items:[
                                    {
                                        xtype:'datefield',
                                        fieldLabel:'实际开始日期',
                                        name:'actual_start_date',
                                        //allowBlank: false,
                                        editable: false,
                                        flex: 1,
                                        //value : Ext.Date.clone(new Date()),
                                        format:'Y-m-d'
                                    },
                                    {
                                        xtype:'datefield',
                                        fieldLabel:'实际结束日期',
                                        name:'actual_end_date',
                                        //allowBlank: false,
                                        editable: false,
                                        flex: 1,
                                        //value : Ext.Date.clone(new Date()),
                                        format:'Y-m-d'
                                    }
                                ]
                            },


                            {
                                xtype:'textarea',
                                name:'maintenanceItem',
                                width:'100%',
                                fieldLabel:'设备检修内容，停役时间'
                            },
                            {
                                xtype:'textarea',
                                name:'stopDevices',
                                fieldLabel:'停役设备'
                            },
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h4',border:false,
                                items:[
                                    {
                                        xtype: 'fileuploadfield',
                                        fieldLabel: '相关图片',
                                        buttonText: '...',
                                        flex:1,
                                        regex: /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                                        regexText: '必须为图片',
                                        name: 'sketchingImg'
                                    },
                                    {
                                        xtype:'button',
                                        name:'imgBtn',
                                        margin:'0 0 0 5',
                                        //width:'9.5%',
                                        text:'下载'
                                    },
                                    {
                                        xtype:'fileuploadfield',
                                        fieldLabel: '相关文档',
                                        buttonText: '...',
                                        flex:1,
                                        regex : /\.([dD][oO][cC]){1}$|\.([tT][xX][tT]){1}$|\.([xX][lL][sS]){1}$|\.([xX][lL][sS][xX]){1}$/,
                                        regexText : '必须为文档类型',
                                        name: 'docs'
                                    },
                                    {
                                        xtype:'button',
                                        name:'docBtn',
                                        margin:'0 0 0 5',
                                        //width:'9.5%',
                                        text:'下载'
                                    }
                                ]
                            },
                            {
                                xtype:'radiogroup',
                                fieldLabel:'工作完成情况',
                                columns:4,
                                name:'cmpGp',
                                vertical:false,
                                items:[
                                    {boxLabel:'正常',name:'completeState',inputValue:'1',checked: true},
                                    {boxLabel:'延期',name:'completeState',inputValue:'0'},
                                    {boxLabel:'改期',name:'completeState',inputValue:'2'},
                                    {boxLabel:'取消',name:'completeState',inputValue:'-1'}
                                ]
                            },
                            {
                                xtype:'textarea',
                                name:'description',
                                fieldLabel:'相关情况说明'
                            },

                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h5',border:false,
                                items:[
                                    {
                                        xtype:'textfield',flex: 1,
                                        name:'fillingPerson',
                                        fieldLabel:'工作完成情况填写人',
                                        //allowBlank: false,
                                        maxLength: 255
                                    },
                                    {
                                        xtype:'datefield',
                                        fieldLabel:'工作完成情况填写时间<span style="color:red;">*</span>',
                                        name:'fillingTime',
                                        //allowBlank: false,
                                        editable: false,
                                        flex: 1,
                                        value : Ext.Date.clone(new Date()),
                                        format:'Y-m-d'
                                    }
                                ]
                            },
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h6',border:false,
                                items:[
                                    {
                                        xtype:'textfield',flex: 1,
                                        name:'managerId',
                                        fieldLabel:'负责人',
                                        //allowBlank: false,
                                        maxLength: 255
                                    },
                                     {
                                         xtype:'textfield',flex: 1,
                                         name:'listerId',
                                         fieldLabel:'制表人',
                                         //allowBlank: false,
                                         maxLength: 255
                                     }
                                ]
                            },
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h7',border:false,
                                items:[
                                    {
                                        xtype:'textfield',flex: 1,
                                        name:'waterCompany',
                                        fieldLabel:'制水公司',
                                        //allowBlank: false,
                                        maxLength: 255
                                    },
                                    {
                                        xtype:'textfield',flex: 1,
                                        name:'waterSupplyDispatchId',
                                        fieldLabel:'供水调度室',
                                        //allowBlank: false,
                                        maxLength: 255
                                    }
                                ]
                            },
                            {xtype:'form',layout:{type:'hbox',align: 'stretch'},name:'h8',border:false,
                                items:[
                                    {
                                        flex:1,
                                        xtype:'radiogroup',
                                        fieldLabel:'是否送往局调度监测中心审批',
                                        height:40,
                                        columns:2,
                                        style:'',
                                        name:'group1',
                                        vertical:false,
                                        items:[
                                            {boxLabel:'是',name:'isMonitoringCenter',inputValue:'1'},
                                            {boxLabel:'否',name:'isMonitoringCenter',inputValue:'-1',checked: true}
                                        ]
                                    },
                                    {
                                        flex:1,
                                        xtype:'radiogroup',
                                        fieldLabel:'是否送往局调度监测中心备案',
                                        columns:2,
                                        style:'',
                                        name:'group2',
                                        vertical:false,
                                        items:[
                                            {boxLabel:'是',name:'isDispatchCenter',inputValue:'1'},
                                            {boxLabel:'否',name:'isDispatchCenter',inputValue:'-1',checked: true}
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype:'textarea',
                                fieldLabel:'审批意见',
                                name:'approvalOpinion'
                            }
                        ]
                }
            ],
            buttons: [{
                xtype: 'jbutton',
                action:'save',
                text:'提交（启动）'
            }, {
                xtype:'jbutton',
                action:'reset'
            },

                {xtype:'jbutton',
                    name:'pass',
                    text:'通过'
                },
                {
                    xtype:'jbutton',
                    name:'reject',
                    text:'驳回'
                }
            ]
        });
        this.callParent(arguments);
    }
});
