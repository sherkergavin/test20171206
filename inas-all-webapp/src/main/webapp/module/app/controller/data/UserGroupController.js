Ext.define('inas.controller.data.UserGroupController', {
    extend: 'Ext.app.Controller',
    views: ['data.UserGroupView'],
    stores: ['data.MessageGroupStore', 'data.UnUsedMessageGroupStore'],
    models: ['inas.model.system.SelectorModel'],
    refs: [
        {
            ref: 'ugroupPanel',
            selector: 'ugroupPanel'
        },{
            ref : 'itemsSelector',
            selector: 'ugroupPanel>panel>panel>itemselector'
        }

    ],
    init: function () {
        this.control({
            'ugroupPanel>treepanel': {
                render: this.initTree,
                itemclick: this.nodeClick
            },
            'ugroupPanel>toolbar>button[action="add"]': {
                click: this.doAdd
            },
            'ugroupPanel>toolbar>button[action="delete"]': {
                click: this.doDelete
            },
            'ugroupPanel>toolbar>button[action="save"]': {
                click: this.doSave
            },
            'ugroupPanel>toolbar>button[action="reset"]': {
                click: this.doReset
            },
            'ugroupPanel>toolbar>button[action="submit"]': {
                click: this.doSMS
            }
        });
    },

    initTree: function (t, e) {
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },
    nodeClick: function (t, record, item, index, e, eOpts) {
        //将请求到数据放入form的控件中
        var me = this;
        me.getItemsSelector().setDisabled(false);
        var ugForm = me.getUgroupPanel().down('panel[name="cenP"]').down('form[name="ugForm"]').getForm();
        var idFd = ugForm.findField('id');
        var nameFd = ugForm.findField('name');
        var loFd = ugForm.findField('lo');
        var msgItemSelector = me.getUgroupPanel().down('panel[name="cenP"]').down('panel[name="uPanel"]').down('itemselector[name="userItemSelector"]');
        if (record.raw.leaf != null) {
            //根据id来获取对应的群的信息
            Ext.Ajax.request({
                url: projectGP('/messageGroup/getMessageGroupById'),
                params: {
                    id: record.raw.id
                },
                success: function (response) {
                    var text = response.responseText;
                    var repJsonData = Ext.JSON.decode(text).data;
                    idFd.setValue(repJsonData.id);
                    nameFd.setValue(repJsonData.name);
                    loFd.setValue(repJsonData.lo);
                    msgItemSelector.getStore().load({
                        params: {
                            id: record.raw.id
                        },
                        callback: function () {
                            var array = new Array();
                            var UnUsedMessageUserStore = Ext.create('inas.store.data.UnUsedMessageGroupStore');
                            UnUsedMessageUserStore.load({
                                params: {
                                    id: record.raw.id
                                },
                                callback: function (records, options, success) {
                                    Ext.each(records, function (item) {
                                        array.push(item.data.value);
                                    });
                                    //console.log(array);
                                    msgItemSelector.setValue(array);
                                }

                            })
                        }
                    });
                }
            });
        }
    },
    doAdd: function () {
        var me = this;
        me.getItemsSelector().setDisabled(true);
        var ourTree = me.getUgroupPanel().down('treepanel');
        ourTree.getStore().reload();
        var ugPanel = me.getUgroupPanel().down('panel[name="cenP"]');
        var uForm = ugPanel.down('form[name="ugForm"]');
        var uPanel = ugPanel.down('panel[name="uPanel"]');
        uForm.getForm().findField('id').setValue(null);
        uForm.getForm().findField('name').setValue(null);
        uForm.getForm().findField('lo').setValue(null);
        //uPanel.down('itemselector').getStore().removeAll();
        uPanel.down('itemselector').getStore().load();
        var array = new Array();
        var UnUsedMessageUserStore = Ext.create('inas.store.data.UnUsedMessageGroupStore');
        UnUsedMessageUserStore.load({
            params: {
                id: 0
            },
            callback: function (records, options, success) {
                Ext.each(records, function (item) {
                    array.push(item.data.value);
                });
                //console.log(array);
                uPanel.down('itemselector').setValue(array);
            }

        })
    },
    doDelete: function () {
        var ourTree = this.getUgroupPanel().down('treepanel');
        var ugPanel = this.getUgroupPanel().down('panel[name="cenP"]');
        var record = ourTree.getSelectionModel().getSelection()[0];
        if (record) {
            Ext.MessageBox.confirm('删除!', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/messageGroup/delMessageGroupById'),
                        method: 'post',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if (res.success) {
                                ourTree.getStore().reload();
                                var uForm = ugPanel.down('form[name="ugForm"]');
                                var uPanel = ugPanel.down('panel[name="uPanel"]');
                                uForm.getForm().findField('id').setValue(null);
                                uForm.getForm().findField('name').setValue(null);
                                uForm.getForm().findField('lo').setValue(null);
                                uPanel.down('itemselector[name="userItemSelector"]').getStore().removeAll();
                            } else {
                                Ext.Msg.alert('提示', res.handle);
                            }
                        }
                    });
                }
            })
        } else {
            Ext.Msg.alert('提示', '未选择的需删除的群组！');
        }
    },
    doSave: function () {
        var me = this;
        var ourTree = me.getUgroupPanel().down('treepanel');
        var ugPanel = me.getUgroupPanel().down('panel[name="cenP"]');
        var uForm = ugPanel.down('form[name="ugForm"]');
        var uPanel = ugPanel.down('panel[name="uPanel"]');
        var uId = uForm.getForm().findField('id').getValue();
        var uName = uForm.getForm().findField('name').getValue();
        var uLo = uForm.getForm().findField('lo').getValue();
        var itselect = uPanel.down('itemselector[name="userItemSelector"]').getSubmitValue();
      // if (itselect == null || itselect == '') {
       if(itselect == null){
            Ext.Msg.alert('提示', '新增用户前请点击"新增"按钮，编辑用户前请先选择用户组！');

        } else {
           alert(itselect);
            if(uForm.getForm().isValid()){
                Ext.Ajax.request({
                    url: projectGP('/messageGroup/saveMessageGroup'),
                    params: {
                        id: uId,
                        name: uName,
                        lo: uLo,
                        uList: itselect
                    },
                    success: function (response) {
                        var text = Ext.JSON.decode(response.responseText);
                        if(text.success){
                            ourTree.getStore().reload();
                            Jm.Msg.success('保存成功');
                        }else{
                            Jm.Msg.error(text.handle);
                        }
                    }
                });
            }
        }
    },
    doReset: function () {
        var me = this;
        var ugForm = me.getUgroupPanel().down('panel[name="cenP"]').down('form[name="ugForm"]').getForm();
        var idFd = ugForm.findField('id');
        var nameFd = ugForm.findField('name');
        var loFd = ugForm.findField('lo');
        var msgItemSelector = me.getUgroupPanel().down('panel[name="cenP"]').down('panel[name="uPanel"]').down('itemselector[name="userItemSelector"]');
        var ourTree = me.getUgroupPanel().down('treepanel');
        var record = ourTree.getSelectionModel().getSelection()[0];
        if (record) {
            Ext.Ajax.request({
                url: projectGP('/messageGroup/getMessageGroupById'),
                params: {
                    id: record.raw.id
                },
                success: function (response) {
                    var text = response.responseText;
                    var repJsonData = Ext.JSON.decode(text).data;
                    idFd.setValue(repJsonData.id);
                    nameFd.setValue(repJsonData.name);
                    loFd.setValue(repJsonData.lo);
                    msgItemSelector.getStore().load({
                        params: {
                            id: record.raw.id
                        },
                        callback: function () {
                            var array = new Array();
                            var UnUsedMessageUserStore = Ext.create('inas.store.data.UnUsedMessageGroupStore');
                            UnUsedMessageUserStore.load({
                                params: {
                                    id: record.raw.id
                                },
                                callback: function (records, options, success) {
                                    Ext.each(records, function (item) {
                                        array.push(item.data.value);
                                    });
                                    //console.log(array);
                                    msgItemSelector.setValue(array);
                                }

                            })
                        }
                    });
                }
            });
        } else {
            //Ext.Msg.alert('提示', '未选择的需重置的群组！');
            ugForm.reset();
        }
    },
    doSMS:function(btn){
        var me = this;
        var treeSelect = me.getUgroupPanel().down('treepanel').getSelectionModel().getSelection()[0];
        if('undefined' != typeof(treeSelect)){
            Jm.Msg.confirm('是否给当前组别下的所有用户发送测试短信?',function(btn){
                if(btn == 'ok'){
                    Ext.Ajax.request({
                        method : 'post',
                        url : projectGP('/messageGroup/testMessage'),
                        params : {
                            id : treeSelect.data.id
                        },
                        success:function(response){
                            var result = Ext.JSON.decode(response.responseText);
                            Jm.Msg.success(result.handle);
                        }
                    });
                }
            });
        }else{
            Jm.Msg.warning('请先选择需要测试的短信组！');
        }

    }
});