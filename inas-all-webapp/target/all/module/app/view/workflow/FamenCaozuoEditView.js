/**
 * Created by Administrator on 2016/4/15.
 */
Ext.define('inas.view.workflow.FamenCaozuoEditView',{
    extend:'Ext.window.Window',
    alias:'widget.famenCaozuoEditView',
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
                name:'famenCaozuoEditFrom',
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
                        items:[{xtype:'textfield',fieldLabel:'口径',name:'dn',labelAlign: 'right',regex : /^\+?[1-9]\d*$/,regexText : '必须为正数且大于0'}]
                    },{//元素2
                        columnWidth:.5,
                        layout:'form',
                        items:[{xtype:'textfield',fieldLabel:'单位',name:'fill_unit',labelAlign: 'right'}]
                    }]
                }, { //行3
                    columnWidth:1,
                    layout:'column',
                    items:[{
                        columnWidth:1,
                        layout:'form',
                        items:[{xtype:'textfield',fieldLabel:'地点',name:'place',labelAlign: 'right'}]
                    }]
                }, {//行4
                    columnWidth:1,
                    layout:'column',
                    items:[{//元素1
                        columnWidth:.5,
                        layout:'form',
                        style:'margin-right:15px;',
                        items:[{xtype:'datetimefield',fieldLabel:'计划开始时间',name:'planing_start_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
                    },{//元素2
                        columnWidth:.5,
                        layout:'form',
                        items:[{xtype:'datetimefield',fieldLabel:'计划结束时间',name:'planing_end_time',labelAlign: 'right',format: 'Y-m-d H:i'}]
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
                                {boxLabel: '操作单', name: 'type', inputValue: '1', width: 'auto',id:'type1'},
                                {boxLabel: '调度令', name: 'type', inputValue: '2', width: 'auto',id:'type2'},
                            ]
                        },{
                            columnWidth:.5,
                            xtype:'radiogroup',
                            labelAlign: 'right',
                            fieldLabel:'局调度监测中心',
                            columns:5,
                            allowBlank:false,
                            items:[
                                {boxLabel: '是', name: 'is_monitoring_center', inputValue: '1', width: 'auto',id:'is_monitoring_center1'},
                                {boxLabel: '否', name: 'is_monitoring_center', inputValue: '2', width: 'auto',id:'is_monitoring_center2'}
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
                            items:[{xtype:'textareafield',fieldLabel:'工作内容',name:'job_content',labelAlign: 'right'}]
                        }]
                    },
                    {//行9
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.46,
                            xtype:'fileuploadfield',
                            labelAlign: 'right',
                            name:'attachment_file_a',
                            fieldLabel:'附件一',
                            //msgTarget:'side',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'上传'
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
                            xtype:'fileuploadfield',
                            name:'attachment_file_c',
                            labelAlign: 'right',
                            fieldLabel:'附件三',
                            //msgTarget:'side',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'上传'
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
                            xtype:'fileuploadfield',
                            name:'attachment_file_b',
                            fieldLabel:'附件二',
                            //msgTarget:'side',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'上传'
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
                            xtype:'fileuploadfield',
                            labelAlign: 'right',
                            name:'attachment_file_d',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            fieldLabel:'附件四',
                            //msgTarget:'side',
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'上传'
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