/**
 * Created by JM-SD09 on 2015/8/26.
 */
Ext.define('inas.view.work.SumMarizeWindow', {
    extend: 'Ext.Window',
    alias: 'widget.sumMarizeWindow',
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            buttonAlign: 'center',
            width: "45%",
            layout:'fit',
            modal: true,
            items: [{
                name: 'sumMarizeForm',
                xtype: 'form',
                layout: 'anchor',
                buttonAlign: 'center',
                bodyPadding: 5,
                defaults: {
                    anchor: '95%',
                    margin: '5 0 0 5',
                    allowBlank: false
                }, items: [{xtype: 'hiddenfield', name: 'id'},
                    {
                        xtype: 'textfield',
                        fieldLabel: '文档编号<a style="color: red">*</a>',
                        readOnly : true,
                        name: 'code'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '小结名称<a style="color: red">*</a>',
                        readOnly : true,
                        name: 'name'
                    },{
                        xtype: 'datefield',
                        fieldLabel: '小结时间<a style="color: red">*</a>',
                        name: 'dateTime',
                        editable: false,
                        format:'Y-m-d'
                    }, {
                        xtype: 'textarea',
                        fieldLabel: '小结人员<a style="color: red">*</a>',
                        name: 'attendance',
                        height:40
                    }, {
                        xtype: 'textarea',
                        fieldLabel: '计划内容<a style="color: red">*</a>',
                        height: 60,
                        name: 'content'
                    },
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
                            }]
                    },

                    {
                        layout : 'column',
                        items:[{
                            columnWidth:.5,
                            layout:'form',
                            defaultType : 'textfield',
                            items:[{
                                xtype: 'textfield',
                                fieldLabel: '创建人',
                                readOnly : true,
                                allowBlank: true,
                                name: 'creator'
                            }, {
                                xtype: 'datefield',
                                fieldLabel: '创建时间',
                                name: 'create_date',
                                readOnly : true,
                                allowBlank: true,
                                format:'Y-m-d'
                            }]
                        },{
                            columnWidth:.5,
                            layout:'form',
                            defaultType : 'textfield',
                            items:[{
                                xtype: 'textfield',
                                fieldLabel: '最后修改人',
                                readOnly : true,
                                allowBlank: true,
                                name: 'editor'
                            }, {
                                xtype: 'datefield',
                                fieldLabel: '最后修改时间',
                                name: 'edit_date',
                                readOnly : true,
                                allowBlank: true,
                                editable: false,
                                format:'Y-m-d'
                            }]
                        }]
                    }
                ],
                buttons: [{
                    xtype: 'jbutton',
                    action: 'submit'
                }, {
                    xtype: 'jbutton',
                    action: 'reset'
                }, {
                    xtype: 'jbutton',
                    text: '取消',
                    action: 'cancel'
                }]
            }]
        });
        this.callParent(arguments);
    }
});