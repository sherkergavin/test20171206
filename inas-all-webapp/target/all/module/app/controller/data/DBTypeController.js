Ext.define('inas.controller.data.DBTypeController', {
    extend: 'Ext.app.Controller',
    models: ['pm.DBTypeModel'],
    stores: ['pm.DBTypeStore','pm.AllSourceTypeStore'],
    views: ['data.DBType'],
    refs: [
        {
            ref: 'dbtypePanel',
            selector: 'dbtypePanel'
        }
    ],
    init: function () {
        this.control({
            'dbtypePanel':{
                show:this.loadCombo
            },
            'dbtypePanel>treepanel[name="db_TypeTree"]': {
                itemclick: this.dataNodeClick
            },
            'dbtypePanel>toolbar>button[action="addSource"]': {
                click: this.addSource
            },
            'dbtypePanel>toolbar>button[action="reset"]': {
                click: this.doDataReset
            },
            'dbtypePanel>toolbar>button[action="save"]': {
                click: this.doSave
            },
            //'dbtypePanel>toolbar>button[action="delete"]': {
            //    click: this.doDelSouce
            //},
            'dbtypePanel>form[name="db_source"]>form[name="comSet"]>combo[name="data_source_type"]':{
                change:this.bindDriverName
            }

            //删除
            //测试

        });
    },
    bindDriverName: function ( combo,newValue, oldValue, eOpts ) {
        var driverFiled=this.getDbtypePanel().down('textfield[name="driver_name"]');
        var connectFiled=this.getDbtypePanel().down('textfield[name="connect_url"]');
        var dbNameFiled=this.getDbtypePanel().down('textfield[name="name"]');
        var newType=newValue;
        if(newType!=null && newType!='' && newType!=0){
        Ext.Ajax.request({
            url: projectGP('/dbType/queryBySourceTypeId'),
            method: 'post',
            params: {
                typeId: newType
            },
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    //alert(res.data.name+'---'+res.data.driverName+'---'+res.data.connectUrl);
                    dbNameFiled.setValue(res.data.name);
                    driverFiled.setValue(res.data.driverName);
                    connectFiled.setValue(res.data.connectUrl);
                } else {
                    Jm.MessageBox.error(res.handle);
                }
            }
        });
        }
    },

    //详细信息
    dataNodeClick: function (tree, record, item, index, e, eOpts) {
        var dbform = this.getDbtypePanel().down('form[name="db_source"]');
        dbform.getForm().load({
            url: projectGP('/dbType/queryBySourceId'),
            params: {
                'id': record.data.id
            },
            success: function (fm, action) {
                fm.setValues(action.result.data);
            }
        });
    },

    //新增数据源类型
    addSource: function () {
        var dbform = this.getDbtypePanel().down('form[name="db_source"]');
        dbform.getForm().reset();
    },

    //保存
    doSave: function () {
        var dbform = this.getDbtypePanel().down('form[name="db_source"]');
        var tree = this.getDbtypePanel().down('treepanel[name="db_TypeTree"]');
        var id = dbform.getForm().findField('id').getValue();
        var name=dbform.getForm().findField('name').getValue();
        if (id == 0 || id == null ) {
            if(name!=null && name!='' ) {
                //增加
                dbform.getForm().submit({
                    waitMsg: '请稍等...',
                    url: projectGP('/dbType/addNewSource'),
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
                Jm.MessageBox.info( '请正确填写数据源类型必填项！')
            }
        } else {
            //修改
            dbform.getForm().submit({
                waitMsg: '请稍等...',
                url: projectGP('/dbType/updSourceInfo'),
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
        var dbform = this.getDbtypePanel().down('form[name="db_source"]');
        var fid=dbform.getForm().findField('id').getValue();
        if ( fid != null && fid!= '' && fid != 0) {
            //重新加载数据
            dbform.getForm().load({
                url: projectGP('/dbType/queryBySourceId'),
                params: {
                    'id': dbform.getForm().findField('id').getValue()
                },
                success: function (fm, action) {
                    fm.setValues(action.result);
                }
            })
        }else{
            Jm.MessageBox.info('请选择需重置的数据源类型！');
        }
    },

    //加载combobox
    loadCombo: function (view, record, item, index, e, eOpts) {
        var dbform = this.getDbtypePanel().down('form[name="db_source"]');
        var com = dbform.down('form[name="comSet"]').down('combo[name="data_source_type"]')
        com.getStore().load();
    },

    //删除
    doDelSouce: function () {
        var tree = this.getDbtypePanel().down('treepanel[name="db_TypeTree"]');
        var record = tree.getSelectionModel().getSelection()[0];
        if (record) {
            Ext.MessageBox.confirm('删除该数据源类型', '确定删除？删除后关联表信息将丢失！', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/dbType/delSourceById'),
                        method: 'post',
                        params: {
                            sourceId: record.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if (res.success) {
                                tree.getStore().load();
                            } else {
                                Jm.MessageBox.error(res.handle);
                            }
                        }
                    });
                }
            })
        } else {
            Jm.MessageBox.info('请选择需要删除的行!');
        }
    }


});