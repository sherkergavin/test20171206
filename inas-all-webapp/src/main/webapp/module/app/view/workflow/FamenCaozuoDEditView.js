/**
 * Created by Administrator on 2016/4/15.
 */
Ext.define('inas.view.workflow.FamenCaozuoDEditView',{
    extend:'Ext.window.Window',
    alias:'widget.famenCaozuoDEditView',
    initComponent:function() {
        var me = this;
        Ext.apply(me,{
            title:'阀门操作单-编辑',
            width:'65%',
            layout:'fit',
            modal: true,
            buttonAlign:'center',
            items:[{//内容
                xtype : 'form',
                layout: 'anchor',
                name:'famenCaozuoDEditFrom',
                defaults: {
                    anchor: '95%',
                    margin: '5 0 0 5',
                    allowBlank: false
                },
                items:[{xtype: 'hiddenfield', name: 'id'},
                {//行1
                    columnWidth:1,//该列在整行中所占的百分比
                    layout:'column',
                    items:[{//元素1
                        columnWidth:1,
                        layout:'form',
                        items:[{xtype:'textfield',fieldLabel:'编号',name:'code',labelAlign: 'right',readOnly : true}]
                    }]
                },{//行2
                    columnWidth:1,
                    layout:'column',
                    items:[{//元素1
                        columnWidth:.5,
                        style:'margin-right:15px;',
                        layout:'form',
                        items:[{xtype:'textfield',fieldLabel:'口径',name:'dn',labelAlign: 'right',readOnly : true,regex : /^\+?[1-9]\d*$/,regexText : '必须为正数且大于0'}]
                    },{//元素2
                        columnWidth:.5,
                        layout:'form',
                        items:[{xtype:'textfield',fieldLabel:'单位',name:'fill_unit',labelAlign: 'right',readOnly : true}]
                    }]
                }, { //行3
                    columnWidth:1,
                    layout:'column',
                    items:[{
                        columnWidth:1,
                        layout:'form',
                        items:[{xtype:'textfield',fieldLabel:'地点',name:'place',labelAlign: 'right',readOnly : true}]
                    }]
                }, {//行4
                    columnWidth:1,
                    layout:'column',
                    items:[{//元素1
                        columnWidth:.5,
                        layout:'form',
                        style:'margin-right:15px;',
                        items:[{xtype:'datetimefield',fieldLabel:'计划开始时间',name:'planing_start_time',labelAlign: 'right',format: 'Y-m-d H:i',readOnly : true}]
                    },{//元素2
                        columnWidth:.5,
                        layout:'form',
                        items:[{xtype:'datetimefield',fieldLabel:'计划结束时间',name:'planing_end_time',labelAlign: 'right',format: 'Y-m-d H:i',readOnly : true}]
                    }]
                },{//行5
                    columnWidth:1,
                    layout:'column',
                    items:[{//元素1
                        columnWidth:.5,
                        layout:'form',
                        style:'margin-right:15px;',
                        items:[{xtype:'datetimefield',fieldLabel:'实际开始时间',name:'actual_start_time',labelAlign : 'right',format: 'Y-m-d H:i'}]
                    },{//元素2
                        columnWidth:.5,
                        layout:'form',
                        items:[{xtype:'datetimefield',fieldLabel:'实际结束时间',name:'actual_end_time',labelAlign : 'right',format: 'Y-m-d H:i'}]
                    }]
                }, {//行6
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            xtype:'radiogroup',
                            fieldLabel:'类型',
                            labelAlign: 'right',
                            columns:5,
                            allowBlank:false,
                            items:[
                                {boxLabel: '操作单', name: 'type', inputValue: '1', width: 'auto',id:'type1',readOnly : true},
                                {boxLabel: '调度令', name: 'type', inputValue: '2', width: 'auto',id:'type2',readOnly : true},
                            ]
                        },{
                            columnWidth:.5,
                            xtype:'radiogroup',
                            labelAlign: 'right',
                            fieldLabel:'局调度监测中心',
                            columns:5,
                            allowBlank:false,
                            items:[
                                {boxLabel: '是', name: 'is_monitoring_center', inputValue: '1', width: 'auto',id:'is_monitoring_center1',readOnly : true},
                                {boxLabel: '否', name: 'is_monitoring_center', inputValue: '2', width: 'auto',id:'is_monitoring_center2',readOnly : true}
                            ]
                        }]
                    }, {//行7
                            columnWidth:1,
                            layout:'column',
                            items:[{
                                columnWidth:1,
                                xtype:'checkboxgroup',
                                fieldLabel:'来电情况',
                                labelAlign : 'right',
                                id:'phone',
                                columns:4,
                                items:[
                                    {boxLabel:'操作前来电', name:'before_job',inputValue:'1',width: 'auto'},
                                    {boxLabel:'操作后来电', name:'after_job',inputValue:'1',width: 'auto'},
                                    {boxLabel:'完成工作内容前来电', name:'before_finish',inputValue:'1',width: 'auto'},
                                    {boxLabel:'完成操作内容后来电', name:'after_finish',inputValue:'1',width: 'auto'}
                                ]
                            }]
                    }, {//行8
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textareafield',fieldLabel:'工作内容',name:'job_content',labelAlign: 'right',readOnly : true}]
                        }]
                    },
                    {//行9
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.46,
                            xtype:'textfield',
                            labelAlign: 'right',
                            name:'attachment_file_a',
                            fieldLabel:'附件一'
                            ,readOnly : true
                        },
                        {
                            columnWidth:.04,
                            xtype:'button',
                            name:'imgBtn1',
                            id:'attachment_file_1',
                            margin:'0 0 0 5',
                            text:'下载'
                        },
                        {
                            columnWidth:.46,
                            xtype:'textfield',
                            name:'attachment_file_c',
                            labelAlign: 'right',
                            fieldLabel:'附件三'
                            ,readOnly : true
                        },
                        {
                            columnWidth:.04,
                            xtype:'button',
                            name:'imgBtn3',
                            id:'attachment_file_3',
                            margin:'0 0 0 5',
                            text:'下载'
                        }
                        ]
                    },{//行10
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.46,
                            labelAlign: 'right',
                            xtype:'textfield',
                            name:'attachment_file_b',
                            fieldLabel:'附件二'
                            ,readOnly : true
                        },
                        {
                            columnWidth:.04,
                            xtype:'button',
                            name:'imgBtn2',
                            id:'attachment_file_2',
                            margin:'0 0 0 5',
                            text:'下载'
                        },
                         {
                            columnWidth:.46,
                            xtype:'textfield',
                            labelAlign: 'right',
                            name:'attachment_file_d',
                            fieldLabel:'附件四'
                            ,readOnly : true
                        }
                        ,{
                            columnWidth:.04,
                            xtype:'button',
                            name:'imgBtn4',
                            id:'attachment_file_4',
                            margin:'0 0 0 5',
                            text:'下载'
                        }
                        ]
                    }
                ]
            }],
            buttons:[
                {//按钮1
                    xtype: 'jbutton',
                    action:'save',
                    text:'确定'
                },
                {//按钮2
                    xtype:'jbutton',
                    action:'reset',
                    text:'重置'
                },
                {//按钮4
                    action:'close',
                    text:'取消'
                }
            ]
        })

        this.callParent(arguments);
    }
})