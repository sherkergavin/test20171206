/**
 * Created by luyufei on 2016/4/15.
 */
Ext.define('inas.view.workflow.ChongxiDWin',{
    extend:'Ext.window.Window',
    alias: 'widget.chongxiDWin',
    initComponent:function(){
        Ext.apply(this,{
            width:'65%',
            layout:'fit',
            modal: true,
            buttonAlign:'center',
            items:[{//内容
                xtype: 'form',
                layout: 'anchor',
                bodyPadding: 5,
                name:'chongxiDWin',
                defaults: {
                    anchor: '98%',
                    margin: '5 0 0 5'
                },
                items:[{xtype: 'hiddenfield', name: 'id'},
                    {//行1
                        columnWidth: 1,//该列在整行中所占的百分比
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype:'textfield',fieldLabel:'编号',name:'code',labelAlign: 'right',readOnly : true}]
                        }, {
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'textfield', fieldLabel: '管道口径', name: 'caliber_of_pipeline',labelAlign: 'right',readOnly : true}]
                        }]
                    },
                    {//行2
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype:'datetimefield',fieldLabel:'填报日期',name:'filing_time',labelAlign: 'right',format: 'Y-m-d H:i',readOnly : true}]
                        }, {//元素2
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype:'textfield',fieldLabel:'填报单位',name:'fill_unit',labelAlign: 'right',readOnly : true}]
                        }]
                    },
                    { //行3
                        columnWidth: 1,
                        layout: 'column',
                        items: [{
                            columnWidth: 1,
                            layout: 'form',
                            items: [{xtype:'textfield',fieldLabel:'地点',name:'place',labelAlign: 'right',readOnly : true}]
                        }]
                    },
                    {//行4
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: 1,
                            layout: 'form',
                            items: [{xtype:'textareafield',fieldLabel:'工作内容',name:'job_content',labelAlign: 'right',readOnly : true}]
                        }]
                    },
                    {//行5
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '计划开始时间(冲浊)',name:'plan_start_blunt_turb_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }, {//元素2
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '计划结束时间(冲浊)',name:'plan_end_blunt_turb_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }]
                    },
                    {//行6
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '计划开始时间(加氯)',name:'plan_start_ch_injection_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }, {//元素2
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '计划结束时间(加氯)',name:'plan_end_ch_injection_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }]
                    },
                    {//行7
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '计划开始时间(冲氯)',name:'plan_start_rush_ch_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }, {//元素2
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '计划结束时间(冲氯)',name:'plan_end_rush_ch_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }]
                    },
                    {//行8
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '实际开始时间(冲浊)',name:'actual_start_blunt_turb_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }, {//元素2
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '实际结束时间(冲浊)',name:'actual_end_blunt_turb_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }]
                    },
                    {//行9
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '实际开始时间(加氯)',name:'actual_start_ch_injection_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }, {//元素2
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '实际结束时间(加氯)',name:'actual_end_ch_injection_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }]
                    },
                    {//行10
                        columnWidth: 1,
                        layout: 'column',
                        items: [{//元素1
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '实际开始时间(冲氯)',name:'actual_start_rush_ch_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }, {//元素2
                            columnWidth: .5,
                            layout: 'form',
                            items: [{xtype: 'datetimefield', fieldLabel: '实际结束时间(冲氯)',name:'actual_end_rush_ch_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                        }]
                    },
                    {//行11
                        columnWidth:.5,
                        xtype:'radiogroup',
                        labelAlign: 'right',
                        fieldLabel:'局调度监测中心',
                        columns:5,
                        allowBlank:false,
                        items:[
                            {boxLabel: '是', name: 'is_monitoring_center', id:'is_monitoring_center1',inputValue: '1', width: 'auto',checked: true,readOnly : true},
                            {boxLabel: '否', name: 'is_monitoring_center', id:'is_monitoring_center2', inputValue: '2', width: 'auto',readOnly : true}
                        ]
                    },
                    {//行12
                        columnWidth: 1,
                        layout: 'column',
                        items: [
                            {
                                xtype:'textfield',
                                fieldLabel: '附件一',
                                labelAlign: 'right',
                                columnWidth: .46,
                                readOnly : true,
                                name: 'attachment_file_1'
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
                                xtype:'textfield',
                                fieldLabel: '附件三',
                                labelAlign: 'right',
                                columnWidth: .46,
                                readOnly : true,
                                name: 'attachment_file_3'
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
                    },
                    {//行13
                        columnWidth:1,
                        layout:'column',
                        items:[
                            {
                                xtype:'textfield',
                                fieldLabel: '附件二',
                                labelAlign: 'right',
                                columnWidth: .46,
                                readOnly : true,
                                name: 'attachment_file_2'
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
                                xtype:'textfield',
                                fieldLabel: '附件四',
                                labelAlign: 'right',
                                columnWidth: .46,
                                readOnly : true,
                                name: 'attachment_file_4'
                            },
                            {
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
                    action:'reset'
                },
                {//按钮4
                    action:'close',
                    text:'取消'
                }
            ]
        })
        this.callParent(arguments);
    }
});
