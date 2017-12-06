/**
 * Created by ZS on 2015/7/30.
 */
Ext.define('inas.view.work.MettingRecWindown',{
    extend:'Ext.window.Window',
    alias:'widget.mettingRecWin',
    initComponent:function(){
        var me=this;
        Ext.apply(this,{
            title:'',
            width:'60%',
            autoScroll : true,
            height:'98%',
            buttonAlign:'center',
            modal:true,
            items:[
                {
                    xtype:'form',
                    layout: 'anchor',
                    bodyPadding : 5,
                    defaults: {
                        anchor: '95%',
                        margin: '5 0 0 5'
                    },
                    items:
                        [
                            {xtype: 'hiddenfield', name: 'id'},
                            {
                                xtype:'textfield',
                                fieldLabel: '文档编号<span style="color:red;">*</span>',
                                allowBlank: false,
                                name: 'code'
                            },
                            {
                                xtype:'datefield',
                                fieldLabel:'会议时间<span style="color:red;">*</span>',
                                name:'hyTime',
                                editable: false,
                                allowBlank: false,
                                format:'Y-m-d'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '会议名称<span style="color:red;">*</span>',
                                allowBlank: false,
                                name: 'name'
                            },
                            {
                                xtype:'textareafield',
                                fieldLabel: '与会人员<span style="color:red;">*</span>',
                                allowBlank: false,
                                name: 'attendance'
                            },
                            {
                                xtype:'textareafield',
                                fieldLabel: '会议内容<span style="color:red;">*</span>',
                                allowBlank: false,
                                name: 'content'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '会议地点<span style="color:red;">*</span>',
                                allowBlank: false,
                                name: 'address'
                            },

                            {
                                xtype:'textareafield',
                                fieldLabel: '备注',
                                name: 'description'
                            }
                            ,
                            {
                                xtype:'form',
                                layout:'hbox',
                                items:[
                                    {
                                        xtype:'fileuploadfield',
                                        fieldLabel: '相关图片',
                                        buttonText: '上传',
                                        width:'45%',
                                        regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                                        regexText : '必须为图片',
                                        name: 'met_img1'
                                    },
                                    {
                                        xtype:'button',
                                        name:'imgBtn1',
                                        id:'img1',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    },
                                    {
                                        xtype:'fileuploadfield',
                                        buttonText: '上传',
                                        fieldLabel: '\t',
                                        labelSeparator:'',
                                        width:'45%',
                                        regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                                        regexText : '必须为图片',
                                        name: 'met_img2'
                                    },
                                    {
                                        xtype:'button',
                                        name:'imgBtn2',
                                        id:'img2',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    }
                                ]
                            },
                            {
                                xtype:'form',
                                layout:'hbox',
                                items:[
                                    {
                                        xtype:'fileuploadfield',
                                        buttonText: '上传',
                                        width:'45%',
                                        fieldLabel: '\t',
                                        labelSeparator:'',
                                        regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                                        regexText : '必须为图片',
                                        name: 'met_img3'
                                    },
                                    {
                                        xtype:'button',
                                        name:'imgBtn3',
                                        id:'img3',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    },
                                    {
                                        xtype:'fileuploadfield',
                                        buttonText: '上传',
                                        fieldLabel: '\t',
                                        labelSeparator:'',
                                        width:'45%',
                                        regex : /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/,
                                        regexText : '必须为图片',
                                        name: 'met_img4'
                                    },
                                    {
                                        xtype:'button',
                                        name:'imgBtn4',
                                        id:'img4',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    }
                                ]
                            },
                            {
                                xtype:'form',
                                layout:'hbox',
                                items:[
                                    {
                                        xtype:'fileuploadfield',
                                        fieldLabel: '相关文档',
                                        buttonText: '上传',
                                        width:'45%',
                                        regex : /\.([dD][oO][cC]){1}$|\.([tT][xX][tT]){1}$|\.([xX][lL][sS]){1}$|\.([xX][lL][sS][xX]){1}$/,
                                        regexText : '必须为文档类型',
                                        name: 'met_doc1'
                                    },
                                    {
                                        xtype:'jbutton',
                                        name:'docBtn1',
                                        id:'doc1',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    }, {
                                        xtype:'fileuploadfield',
                                        buttonText: '上传',
                                        fieldLabel: '\t',
                                        labelSeparator:'',
                                        width:'45%',
                                        regex : /\.([dD][oO][cC]){1}$|\.([tT][xX][tT]){1}$|\.([xX][lL][sS]){1}$|\.([xX][lL][sS][xX]){1}$/,
                                        regexText : '必须为文档类型',
                                        name: 'met_doc2'
                                    },
                                    {
                                        xtype:'jbutton',
                                        name:'docBtn2',
                                        id:'doc2',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    }
                                ]
                            },

                            {
                                xtype:'form',
                                layout:'hbox',
                                items:[
                                    {
                                        xtype:'fileuploadfield',
                                        fieldLabel: '\t',
                                        labelSeparator:'',
                                        buttonText: '上传',
                                        width:'45%',
                                        regex : /\.([dD][oO][cC]){1}$|\.([tT][xX][tT]){1}$|\.([xX][lL][sS]){1}$|\.([xX][lL][sS][xX]){1}$/,
                                        regexText : '必须为文档类型',
                                        name: 'met_doc3'
                                    },
                                    {
                                        xtype:'jbutton',
                                        name:'docBtn3',
                                        id:'doc3',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    }
                                    ,{
                                        xtype:'fileuploadfield',
                                        fieldLabel: '\t',
                                        labelSeparator:'',
                                        buttonText: '上传',
                                        width:'45%',
                                        regex : /\.([dD][oO][cC]){1}$|\.([tT][xX][tT]){1}$|\.([xX][lL][sS]){1}$|\.([xX][lL][sS][xX]){1}$/,
                                        regexText : '必须为文档类型',
                                        name: 'met_doc4'
                                    },
                                    {
                                        xtype:'jbutton',
                                        name:'docBtn4',
                                        id:'doc4',
                                        margin:'0 0 0 5',
                                        text:'下载'
                                    }
                                ]
                            }
                        ]
                }
            ],
            buttons: [{
                xtype: 'jbutton',
                action:'save'
            }, {
                xtype:'jbutton',
                action:'reset'
            }]
        })
        this.callParent(arguments);
    }
});
