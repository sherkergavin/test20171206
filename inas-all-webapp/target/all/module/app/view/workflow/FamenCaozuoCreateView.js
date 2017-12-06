/**
 * Created by Administrator on 2016/4/14.
 */
Ext.define('inas.view.workflow.FamenCaozuoCreateView',{
    extend:'Ext.window.Window',
    alias:'widget.famenCaozuoCreateView',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            title:'阀门操作单-新建',
            width:'65%',
            layout:'fit',
            modal: true,
            buttonAlign:'center',
            items:[
                {//内容
                    xtype: 'form',
                    layout: 'anchor',
                    bodyPadding: 5,
                    name:'famenCaozuoCreateFrom',
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
                            items:[{xtype:'textfield',fieldLabel:'编号',name:'code',labelAlign: 'right',allowBlank: false}]
                        }]
                    },{//行2
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:.5,
                            style:'margin-right:15px;',
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'口径',name:'dn',labelAlign: 'right',allowBlank: false,regex : /^\+?[1-9]\d*$/,regexText : '必须为正数且大于0'}]
                        },{//元素2
                            columnWidth:.5,
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'填报单位',name:'fill_unit',labelAlign: 'right',allowBlank: false}]
                        }]
                    }, { //行3
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textfield',fieldLabel:'地点',name:'place',labelAlign: 'right',allowBlank: false}]
                        }]
                    }, {//行4
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:.5,
                            layout:'form',
                            style:'margin-right:15px;',
                            items:[{xtype:'datetimefield',fieldLabel:'计划开始时间',name:'planing_start_time',labelAlign: 'right',format: 'Y-m-d H:i',allowBlank: false}]
                        },{//元素2
                            columnWidth:.5,
                            layout:'form',
                            items:[{xtype:'datetimefield',fieldLabel:'计划结束时间',name:'planing_end_time',labelAlign: 'right',format: 'Y-m-d H:i',allowBlank: false}]
                        }]
                    },
                        {//行6
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            xtype:'radiogroup',
                            fieldLabel:'单选',
                            labelAlign: 'right',
                            columns:5,
                            allowBlank:false,
                            items:[
                                {boxLabel: '操作单', name: 'type', inputValue: '1', checked: true, width: 'auto'},
                                {boxLabel: '调度令', name: 'type', inputValue: '2', width: 'auto'},
                            ]
                        },{
                            columnWidth:.5,
                            xtype:'radiogroup',
                            labelAlign: 'right',
                            fieldLabel:'局调度监测中心',
                            columns:5,
                            allowBlank:false,
                            items:[
                                {boxLabel: '是', name: 'is_monitoring_center', inputValue: '1', checked: true, width: 'auto'},
                                {boxLabel: '否', name: 'is_monitoring_center', inputValue: '2', width: 'auto'}
                            ]
                        }]
                    }, {//行7
                        columnWidth:1,
                        layout:'column',
                        items:[{//元素1
                            columnWidth:1,
                            layout:'form',
                            items:[{xtype:'textareafield',fieldLabel:'工作内容',name:'job_content',labelAlign: 'right',allowBlank: false}]
                        }]
                    },{//行8
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            xtype:'fileuploadfield',
                            labelAlign: 'right',
                            name:'attachment_file_a',
                            fieldLabel:'草图一',
                            //msgTarget:'side',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'选择'
                        },{
                            columnWidth:.5,
                            xtype:'fileuploadfield',
                            name:'attachment_file_c',
                            labelAlign: 'right',
                            fieldLabel:'草图三',
                            //msgTarget:'side',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'选择'
                        }]
                    },{//行9
                        columnWidth:1,
                        layout:'column',
                        items:[{
                            columnWidth:.5,
                            labelAlign: 'right',
                            xtype:'fileuploadfield',
                            name:'attachment_file_b',
                            fieldLabel:'草图二',
                            //msgTarget:'side',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'选择'
                        },{
                            columnWidth:.5,
                            xtype:'fileuploadfield',
                            labelAlign: 'right',
                            name:'attachment_file_d',
                            regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                            fieldLabel:'草图四',
                            //msgTarget:'side',
                            anchor:'100%',
                            regexText : '必须为图片',
                            buttonText:'选择'
                        }]
                    }
                    ]
                }
            ],
            buttons:[
                {//按钮1
                    xtype: 'jbutton',
                    action:'save',
                    text:'提交(启动)'
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