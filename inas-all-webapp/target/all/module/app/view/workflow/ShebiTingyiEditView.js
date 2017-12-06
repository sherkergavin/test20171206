/**
 * Created by Administrator on 2016/4/20.
 */
Ext.define('inas.view.workflow.ShebiTingyiEditView',{
    extend:'Ext.window.Window',
    alias:'widget.sheBeiTingYiEditView',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            title:'设备停议单-编辑',
            width:'65%',
            layout:'fit',
            modal: true,
            //bodyStyle :'overflow-x:visible;overflow-y:scroll',
            buttonAlign:'center',
            items:[{//内容
                xtype: 'form',
                layout: 'anchor',
                bodyPadding: 5,
                name:'sheBeiTingYiEditFrom',
                bodyStyle :'overflow-x:visible;overflow-y:scroll',
                defaults: {
                    anchor: '95%',
                    margin: '5 0 0 5',
                    allowBlank: false
                },
                items:[{xtype: 'hiddenfield', name: 'id'},
                    {xtype: 'hiddenfield', name: 'factory_manager'},
                    {xtype: 'hiddenfield', name: 'company_manager'},
                    {xtype: 'hiddenfield', name: 'dispatche_manager'},
                    {xtype: 'hiddenfield', name: 'dispatche_center_director'},
                    {xtype: 'hiddenfield', name: 'dispatcher'},
                    //{xtype: 'hiddenfield', name: 'id'},
                    {//行1
                        columnWidth:1,//该列在整行中所占的百分比
                        layout:'column',
                        items:[{
                            columnWidth:.33,
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'编号',name:'code',labelAlign: 'right'}]
                        },{
                            columnWidth:.33,
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'填报单位',name:'fill_unit',labelAlign: 'right'}]
                        },{
                            columnWidth:.34,
                            layout:'form',
                            items:[{xtype:'datetimefield',fieldLabel:'填报时间',name:'filing_time',labelAlign: 'right',format: 'Y-m-d H:i:s'}]
                        }]
                    },
                    {//行2
                        columnWidth:1,//该列在整行中所占的百分比
                        layout:'column',
                        items:[{//元素1
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'工作概述',name:'job_content',labelAlign: 'right'}]
                        }]
                    },
                    {//行3
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:.5,
                            layout:'form',
                            style:'margin-right:15px;',
                            items:[{xtype:'datetimefield',fieldLabel:'计划开始时间',name:'planing_start_time',labelAlign: 'right',format: 'Y-m-d H:i:s'}]
                        },{//元素2
                            columnWidth:.5,
                            layout:'form',
                            items:[{xtype:'datetimefield',fieldLabel:'计划结束时间',name:'planing_end_time',labelAlign: 'right',format: 'Y-m-d H:i:s'}]
                        }]
                    },
                    {//行!!!!!!!!!!!!!!!!!!!!!
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:.5,
                            layout:'form',
                            style:'margin-right:15px;',
                            items:[{xtype:'datetimefield',fieldLabel:'实际开始时间',name:'actual_start_time',labelAlign: 'right',format: 'Y-m-d H:i:s',hidden:true,id:'actual_start_time'}]
                        },{//元素2
                            columnWidth:.5,
                            layout:'form',
                            items:[{xtype:'datetimefield',fieldLabel:'实际结束时间',name:'actual_end_time',labelAlign: 'right',format: 'Y-m-d H:i:s',hidden:true,id:'actual_end_time'}]
                        }]
                    },
                    {//行4
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textareafield',fieldLabel:'停役检修内容',name:'equipment_stop_content',labelAlign: 'right'}]
                        }]
                    },
                    {//行5
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            xtype:'radiogroup',
                            fieldLabel:'是否影响水量',
                            labelAlign: 'right',
                            columns:5,
                            allowBlank:false,
                            items:[
                                {boxLabel: '是', name: 'type', inputValue: '1', checked: true, width: 'auto',id:'type1'},
                                {boxLabel: '否', name: 'type', inputValue: '2', width: 'auto',id:'type2'},
                            ]
                        }]
                    },
                    {//行6
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textareafield',fieldLabel:'影响说明',name:'influence_content',labelAlign: 'right'}]
                        }]
                    },
                    {//行7
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            xtype:'radiogroup',
                            fieldLabel:'局调度监测中心',
                            labelAlign: 'right',
                            columns:5,
                            allowBlank:false,
                            items:[
                                {boxLabel: '是', name: 'is_monitoring_center', inputValue: '1', checked: true, width: 'auto',id:'is_monitoring_center1'},
                                {boxLabel: '否', name: 'is_monitoring_center', inputValue: '2', width: 'auto',id:'is_monitoring_center'},
                            ]
                        }]
                    },
                    {//行8
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            xtype:'fileuploadfield',
                            labelAlign: 'right',
                            name:'attachment_file_a',
                            fieldLabel:'附件一',
                            //msgTarget:'side',
                            //regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            //regexText : '必须为图片',
                            buttonText:'下载'
                        },{
                            columnWidth:.5,
                            xtype:'fileuploadfield',
                            name:'attachment_file_c',
                            labelAlign: 'right',
                            fieldLabel:'附件三',
                            //msgTarget:'side',
                            //regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            //regexText : '必须为图片',
                            buttonText:'下载'
                        }]
                    },
                    {//行9
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            labelAlign: 'right',
                            xtype:'fileuploadfield',
                            name:'attachment_file_b',
                            fieldLabel:'附件二',
                            //msgTarget:'side',
                            //regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            //regexText : '必须为图片',
                            buttonText:'下载'
                        },{
                            columnWidth:.5,
                            xtype:'fileuploadfield',
                            labelAlign: 'right',
                            name:'attachment_file_d',
                            //regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            fieldLabel:'附件四',
                            //msgTarget:'side',
                            anchor:'100%',
                            //regexText : '必须为图片',
                            buttonText:'下载'
                        }]
                    },
                    {//行10
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:.5,
                            layout:'form',
                            style:'margin-right:15px;',
                            items:[{xtype:'textfield',fieldLabel:'制表人',name:'lister',labelAlign: 'right'}]
                        },{//元素2
                            columnWidth:.5,
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'申报单位负责人',name:'apply_person',labelAlign: 'right'}]
                        }]
                    },
                    {//行11
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:.5,
                            layout:'form',
                            style:'margin-right:15px;',
                            items:[{xtype:'textfield',fieldLabel:'制水分公司',name:'water_company',labelAlign: 'right'}]
                        },{//元素2
                            columnWidth:.5,
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'调度中心',name:'director_center',labelAlign: 'right'}]
                        }]
                    },
                    {//行12
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textareafield',fieldLabel:'审批意见',name:'check_result',labelAlign: 'right'}]
                        }]
                    },
                    {//行13
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textareafield',fieldLabel:'新增审批意见',name:'new_check_result',labelAlign: 'right'}]
                        }]
                    }
                ]
            }
            ],
            buttons: [
                {//按钮1
                    xtype: 'jbutton',
                    action:'save',
                    name:'save',
                    //id:save,
                    text:'通过'
                },
                {//按钮2
                    xtype:'jbutton',
                    action:'reject',
                    name:'reject',
                    text:'驳回'
                },
                {//按钮4
                    xtype:'jbutton',
                    action:'reset',
                    name:'reset',
                    text:'取消'
                }
            ]
        })

        this.callParent(arguments);
    }
})