Ext.define('inas.controller.system.MsgTemplateController', {
    extend: 'Ext.app.Controller',
    stores: ['system.MsgTempTreeStore'],
    views:['system.MessageTemplateView'],
    refs: [
        {
            ref: 'msgTempView',
            selector: 'msgTempView'
        }
    ],
    init: function () {
        this.control({
            'msgTempView>treepanel[name="msgTempTree"]':{
                //render:this.initTree,
                itemclick: this.NodeClick
            },
            'msgTempView>toolbar>button[action="addTemp"]': {
                click: this.addTemp
            },
            'msgTempView>toolbar>button[action="reset"]': {
                click: this.doDataReset
            },
            'msgTempView>toolbar>button[action="save"]': {
                click: this.doSave
            },
            //'msgTempView>toolbar>button[action="delete"]': {
            //    click: this.doDelSouce
            //},

        });
    },


    /**
     * 初始化树
     * @param t
     * @param e
     */
    initTree:function(t,e){
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },


    //详细信息
    NodeClick: function (tree, record, item, index, e, eOpts) {
        var tempform = this.getMsgTempView().down('form[name="msgTempForm"]');
        tempform.getForm().load({
            url: projectGP('/msgTemplate/queryTemplateByEn'),
            params: {
                'id': record.data.id
            },
            success: function (fm, action) {
                fm.setValues(action.result.data[0]);
            }
        });
    },

    //新增数据源类型
    addTemp: function () {
        var tempform = this.getMsgTempView().down('form[name="msgTempForm"]');
        tempform.getForm().reset();
    },

    //保存
    doSave: function () {
        var tempform = this.getMsgTempView().down('form[name="msgTempForm"]');
        var tree = this.getMsgTempView().down('treepanel[name="msgTempTree"]');
        var id = tempform.getForm().findField('id').getValue();
        var title=tempform.getForm().findField('title').getValue();
        if (id == 0 || id == null ) {
            if(title!=null && title!='' ) {
                //增加
                tempform.getForm().submit({
                    waitMsg: '请稍等...',
                    url: projectGP('/msgTemplate/addTemplate'),
                    success: function (fm, action) {
                        if (action.result.success) {
                            tree.getStore().load();
                            fm.reset();
                        }
                    },
                    failure: function(fm, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Jm.MessageBox.error('表单字段不得提交无效值！');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Jm.MessageBox.error('请求失败！');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Jm.MessageBox.error(action.result.handle);
                        }
                    }
                })
            }else{
                Jm.MessageBox.info( '请正确填写短信模板中的必填项！')
            }
        } else {
            //修改
            tempform.getForm().submit({
                waitMsg: '请稍等...',
                url: projectGP('/msgTemplate/updateTemplate'),
                success: function (fm, action) {
                    if (action.result.success) {
                        tree.getStore().load();
                    }
                },
                failure: function(fm, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Jm.MessageBox.error('Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Jm.MessageBox.error('Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Jm.MessageBox.error(action.result.handle);
                    }
                }
            })
        }
    },

    //重置
    doDataReset: function () {
        var tempform = this.getMsgTempView().down('form[name="msgTempForm"]');
        var fid=tempform.getForm().findField('id').getValue();
        if ( fid != null && fid!= '' && fid != 0) {
            //重新加载数据
            tempform.getForm().load({
                url: projectGP('/msgTemplate/queryTemplateByEn'),
                params: {
                    'id': tempform.getForm().findField('id').getValue()
                },
                success: function (fm, action) {
                    fm.setValues(action.result.data[0]);
                }
            })
        }else{
            Jm.MessageBox.info('请先选择需重置的短信模板节点！');
        }
    },

    //加载combobox
    loadCombo: function (view, record, item, index, e, eOpts) {
        var tempform = this.getMsgTempView().down('form[name="msgTempForm"]');
        var com = tempform.down('form[name="comSet"]').down('combo[name="data_source_type"]')
        com.getStore().load();
    }
    //,

    //删除
    //doDelSouce: function () {
    //    var tree = this.getMsgTempView().down('treepanel[name="msgTempTree"]');
    //    var record = tree.getSelectionModel().getSelection()[0];
    //    if (record) {
    //        Ext.MessageBox.confirm('删除该数据源类型', '确定删除？删除后关联表信息将丢失！', function (btn) {
    //            if (btn == 'yes') {
    //                Ext.Ajax.request({
    //                    url: projectGP('/msgTemplate/delSourceById'),
    //                    method: 'post',
    //                    params: {
    //                        sourceId: record.get('id')
    //                    },
    //                    success: function (response) {
    //                        var text = response.responseText;
    //                        var res = Ext.JSON.decode(text);
    //                        if (res.success) {
    //                            tree.getStore().load();
    //                        } else {
    //                            Jm.MessageBox.error(res.handle);
    //                        }
    //                    }
    //                });
    //            }
    //        })
    //    } else {
    //        Jm.MessageBox.info('请选择需要删除的行!');
    //    }
    //}


});