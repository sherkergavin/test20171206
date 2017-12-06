Ext.define('inas.controller.system.RolePermController', {
    extend: 'Ext.app.Controller',
    models: ['system.SelectorModel'],
    stores: ['system.PermTreeStore', 'system.PermFuncTreeStore', 'system.UserCheckedStore', 'system.UnAssignedRoleByPermStore', 'system.UserRoleStore', 'system.PermCheckedStore', 'system.UnAssignedPermStore'],
    views: ['system.RolePermission'],
    refs: [{
        ref: 'rolePermission',
        selector: 'rolePermission'
    }],
    config : {
        'flagTree' : null
    },
    init: function () {
        this.control({
            'rolePermission': {
                //     show:this.doLoadRoleUser
                //   itemdblclick: this.doEdit
            },
            /*'rolePermission>panel>form[name="permissionform"]>[name="permitemselector"]':{
             validitychange:this.doEditItemselector
             },*/
            'rolePermission>toolbar>button[action="move-prev"]': {
                click: this.doPrev
            },
            'rolePermission>toolbar>button[action="move-next"]': {
                click: this.doNext
            },
            'rolePermission>panel>panel>treepanel[name="permission"]': {
                //render: this.initPermissionTree
                itemclick: this.doLoadPermRole
            },
            'rolePermission>panel>panel>treepanel[name="func_permission"]': {
                itemclick: this.doLoadFuncPermRole
            },
            //'rolePermission>panel>toolbar>button[action="addPermission"]': {
            //    click: this.doAddWorkFlow
            //},
            //'rolePermission>panel>toolbar>button[action="editPermission"]': {
            //    click: this.doEditWorkFlow
            //},
            'rolePermission>panel>toolbar>button[action="deletePermission"]': {
                click: this.doDelete
            },
            'rolePermission>panel[name="assignRole"]>toolbar>button[action="reset"]': {
                click: this.doRoleReset
            },
            'rolePermission>panel[name="assignRole"]>toolbar>button[action="save"]': {
                click: this.doRoleSave
            },
            'rolePermission>panel>treepanel[name="role"]': {
                itemclick: this.doLoadRolePerm
            },
            'rolePermission>panel[name="assignPerm"]>toolbar>button[action="reset"]': {
                click: this.doPermReset
            },
            'rolePermission>panel[name="assignPerm"]>toolbar>button[action="save"]': {
                click: this.doPermSave
            }
        });
    },
    initPermissionTree: function (t, e) {
        t.store.load({
            callback: function (records, operation, success) {
                t.expandAll();
            }
        });
    },
    doPrev: function () {
        var record = this.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().getSelection()[0];
        if (record) {
            var rolePermission = this.getRolePermission().down('itemselector[name="permitemselector"]');
            this.getRolePermission().down('itemselector[name="permitemselector"]').getStore().load({
                callback: function () {
                    var array = new Array();
                    var UnAssignedRoleStore = Ext.create('inas.store.system.UnAssignedRoleByPermStore');
                    UnAssignedRoleStore.load({
                        params: {id: record.get('id')},
                        callback: function (records, options, success) {
                            Ext.each(records, function (item) {
                                array.push(item.data.value);
                            });
                            rolePermission.setValue(array);
                        }
                    })
                }
            })
        }
        ;
        var permission = this.getRolePermission();
        permission.layout.setActiveItem(0);
        this.getRolePermission().down('jbutton[action="move-prev"]').setDisabled(!permission.getLayout().getPrev());
        this.getRolePermission().down('jbutton[action="move-next"]').setDisabled(!permission.getLayout().getNext());
    },
    doNext: function () {
        var record = this.getRolePermission().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        if (record) {
            var rolePermission = this.getRolePermission().down('itemselector[name="roleitemselector"]');
            this.getRolePermission().down('itemselector[name="roleitemselector"]').getStore().load({
                callback: function () {
                    var array = new Array();
                    var UnAssignedPermStore = Ext.create('inas.store.system.UnAssignedPermStore');
                    UnAssignedPermStore.load({
                        params: {id: record.get('id')},
                        callback: function (records, options, success) {
                            Ext.each(records, function (item) {
                                array.push(item.data.value);
                            });
                            rolePermission.setValue(array);
                        }
                    })
                }
            })
        }
        ;
        var permission = this.getRolePermission();
        permission.layout.setActiveItem(1);
        this.getRolePermission().down('jbutton[action="move-prev"]').setDisabled(!permission.getLayout().getPrev());
        this.getRolePermission().down('jbutton[action="move-next"]').setDisabled(!permission.getLayout().getNext());
    },
    /*权限树，分配角色*/
    doLoadPermRole: function (tree, record, item, index, e, eOpts) {
        var me = this;
        me.setFlagTree('role');
        if (record.parentNode.isRoot()) {
            var rolePermission = me.getRolePermission().down('itemselector[name="permitemselector"]');
            rolePermission.getStore().getProxy().url = projectGP('/role/getRoleUser');
            rolePermission.getStore().load({
                callback: function () {
                    var array = new Array();
                    var UnAssignedRoleStore = Ext.create('inas.store.system.UnAssignedRoleByPermStore');
                    UnAssignedRoleStore.load({
                        params: {id: record.get('id')},
                        callback: function (records, options, success) {
                            Ext.each(records, function (item) {
                                array.push(item.data.value);
                            });
                            rolePermission.setValue(array);
                        }
                    })
                }
            })
        }
    },
    doLoadFuncPermRole: function (tree, record, item, index, e, eOpts) {
        var me = this;
        me.setFlagTree('work');
        if (record.parentNode.isRoot()) {
            var rolePermission = me.getRolePermission().down('itemselector[name="permitemselector"]');
            rolePermission.getStore().getProxy().url = projectGP('/role/getRolePerm');
            rolePermission.getStore().load({
                callback : function(){
                    var array = new Array();
                    var UnAssignedRoleStore = Ext.create('inas.store.system.UnAssignedRoleByPermStore');
                    UnAssignedRoleStore.getProxy().url = projectGP('/permission/getUnAssignedFuncPerm');
                    UnAssignedRoleStore.load({
                        params: {id: record.get('id')},
                        callback: function (records, options, success) {
                            Ext.each(records, function (item) {
                                array.push(item.data.value);
                            });
                            rolePermission.setValue(array);
                        }
                    })
                }
            });
        }
    },
    /*角色树，分配权限*/
    doLoadRolePerm: function (tree, record, item, index, e, eOpts) {
        if (record.parentNode.isRoot()) {
            var rolePerm = this.getRolePermission().down('itemselector[name="roleitemselector"]');
            this.getRolePermission().down('itemselector[name="roleitemselector"]').getStore().load({
                callback: function () {
                    var array = new Array();
                    var UnAssignedPermStore = Ext.create('inas.store.system.UnAssignedPermStore');
                    UnAssignedPermStore.load({
                        params: {id: record.get('id')},
                        callback: function (records, options, success) {
                            Ext.each(records, function (item) {
                                array.push(item.data.value);
                            });
                            rolePerm.setValue(array);
                        }
                    });
                }
            })
        }
    },
    //doAddWorkFlow: function () {
    //    var roleWorkFlowPermWin = Ext.create('inas.view.system.WorkFlowPermWindow');
    //    roleWorkFlowPermWin.title = '新增工作流权限';
    //    roleWorkFlowPermWin.down('form').getForm().url = projectGP('/permission/insertWorkFlowPermission');
    //    roleWorkFlowPermWin.show();
    //},
    //doEditWorkFlow: function () {
    //    var record = this.getRolePermission().down('treepanel[name="workflow"]').getSelectionModel().getSelection()[0];
    //    if (record) {
    //        record = this.getRolePermission().down('treepanel[name="workflow"]').getStore().getNodeById(record.get('id')).raw;
    //        var roleWorkFlowPermWin = Ext.create('inas.view.system.WorkFlowPermWindow');
    //        roleWorkFlowPermWin.down('form').getForm().findField('id').setValue(record.id);
    //        roleWorkFlowPermWin.down('form').getForm().findField('name').setValue(record.text);
    //        roleWorkFlowPermWin.down('form').getForm().findField('code').setValue(record.code);
    //        roleWorkFlowPermWin.down('form').getForm().findField('lo').setValue(record.lo);
    //        roleWorkFlowPermWin.title = '编辑工作流权限';
    //        roleWorkFlowPermWin.down('form').getForm().url = projectGP('/permission/updateWorkFlowPermission');
    //        roleWorkFlowPermWin.show();
    //    } else {
    //        Jm.MessageBox.warning('请选择需要编辑的工作流权限！');
    //    }
    //
    //},
    doAdd: function () {
        var rolePermWin = Ext.create("inas.view.system.RolePermWin");
        rolePermWin.title = '新增权限';
        rolePermWin.down('form').getForm().findField('permission_type').setValue(6);
        rolePermWin.down('form').getForm().url = projectGP('/permission/insertPermission');
        rolePermWin.show();
    },
    doEdit: function () {
        var record = this.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().getSelection()[0];
        if (record) {
            record = this.getRolePermission().down('treepanel[name="permission"]').getStore().getNodeById(record.get('id')).raw;
            var rolePermWin = Ext.create("inas.view.system.RolePermWin");
            rolePermWin.down('form').getForm().findField('id').setValue(record.id);
            rolePermWin.down('form').getForm().findField('permission_type').setValue(parseInt(record.description));
            rolePermWin.down('form').getForm().findField('resource_type').setValue(record.text);
            rolePermWin.down('form').getForm().findField('lo').setValue(record.lo);
            rolePermWin.down('form').getForm().url = projectGP('/permission/updatePermission');
            rolePermWin.title = '编辑权限';
            rolePermWin.show();
        } else {
            Jm.MessageBox.info('未选择权限！');
        }
    },
    doDelete: function () {
        var record = this.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().getSelection()[0];
        var rolePermTree = this.getRolePermission().down('treepanel[name="permission"]');
        var rolePerm = this.getRolePermission().down('itemselector[name="permitemselector"]');
        if (record) {
            Ext.MessageBox.confirm('删除权限', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/permission/deletePermission'),
                        method: 'post',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if (res.success) {
                                rolePermTree.getStore().reload({
                                    callback: function (records, options, success) {
                                        if (records.length > 0) {
                                            rolePermTree.getSelectionModel().selectRange(0, 0);//默认选中第一条数据
                                            var newrocord = rolePermTree.getSelectionModel().getSelection()[0];//重载第一条数据
                                            rolePerm.getStore().load({
                                                callback: function () {
                                                    var array = new Array();
                                                    var UnAssignedRoleStore = Ext.create('inas.store.system.UnAssignedRoleByPermStore');
                                                    UnAssignedRoleStore.load({
                                                        params: {id: newrocord.get('id')},
                                                        callback: function (records, options, success) {
                                                            Ext.each(records, function (item) {
                                                                array.push(item.data.value);
                                                            });
                                                            rolePerm.setValue(array);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                });
                            } else {
                                Ext.Msg.alert('提示', res.handle);
                            }
                        }
                    });
                }
            })
        } else {
            Ext.Msg.alert('提示', '未选择的角色！');
        }
    },
    /*重置分配的角色*/
    doRoleReset: function () {
        var me = this;
        if(me.getFlagTree()=='role'){
            var record = me.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().getSelection()[0];
            if (record) {
                var rolePermission = me.getRolePermission().down('itemselector[name="permitemselector"]');
                this.getRolePermission().down('itemselector[name="permitemselector"]').getStore().load({
                    callback: function () {
                        var array = new Array();
                        var UnAssignedRoleStore = Ext.create('inas.store.system.UnAssignedRoleByPermStore');
                        UnAssignedRoleStore.load({
                            params: {id: record.get('id')},
                            callback: function (records, options, success) {
                                Ext.each(records, function (item) {
                                    array.push(item.data.value);
                                });
                                rolePermission.setValue(array);
                            }
                        })
                    }
                })
            }
        }else if(me.getFlagTree()=='work'){
            var record = me.getRolePermission().down('treepanel[name="func_permission"]').getSelectionModel().getSelection()[0]
            if(record){
                var rolePermission = me.getRolePermission().down('itemselector[name="permitemselector"]');
                rolePermission.getStore().getProxy().url = projectGP('/role/getRolePerm');
                rolePermission.getStore().load({
                    callback : function(){
                        var array = new Array();
                        var UnAssignedRoleStore = Ext.create('inas.store.system.UnAssignedRoleByPermStore');
                        UnAssignedRoleStore.getProxy().url = projectGP('/permission/getUnAssignedFuncPerm');
                        UnAssignedRoleStore.load({
                            params: {id: record.get('id')},
                            callback: function (records, options, success) {
                                Ext.each(records, function (item) {
                                    array.push(item.data.value);
                                });
                                rolePermission.setValue(array);
                            }
                        })
                    }
                });
            }
        }

    },
    /*保存分配的角色*/
    doRoleSave: function () {
        var me = this;
        if(me.getFlagTree()=='role'){
            var ItemSelectorForm = me.getRolePermission().down('form[name="permissionform"]').getForm();
            var record = me.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().getSelection()[0];
            ItemSelectorForm.submit({
                url: projectGP('/permission/insertRolePerm'),
                method: 'POST',
                params: {id: record.get('id')},
                success: function (form, action) {
                    Jm.Msg.success("保存成功！");
                },
                failure: function (form, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            })
        }else if(me.getFlagTree()=='work'){
            var ItemSelectorForm = me.getRolePermission().down('form[name="permissionform"]').getForm();
            var record = me.getRolePermission().down('treepanel[name="func_permission"]').getSelectionModel().getSelection()[0];
            ItemSelectorForm.submit({
                url: projectGP('/permission/insertFuncRolePerm'),
                method: 'POST',
                params: {id: record.get('id')},
                success: function (form, action) {
                    Jm.Msg.success("保存成功！");
                },
                failure: function (form, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            })
        }else{
            Jm.MessageBox.warning('请选择任意一棵权限树进行操作！');
        }
    },
    doPermReset: function () {
        var record = this.getRolePermission().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        if (record) {
            var rolePermission = this.getRolePermission().down('itemselector[name="roleitemselector"]');
            this.getRolePermission().down('itemselector[name="roleitemselector"]').getStore().load({
                callback: function () {
                    var array = new Array();
                    var UnAssignedPermStore = Ext.create('inas.store.system.UnAssignedPermStore');
                    UnAssignedPermStore.load({
                        params: {id: record.get('id')},
                        callback: function (records, options, success) {
                            Ext.each(records, function (item) {
                                array.push(item.data.value);
                            });
                            rolePermission.setValue(array);
                        }
                    })
                }
            })
        }
    },
    doPermSave: function () {
        var ItemSelectorForm = this.getRolePermission().down('form[name="roleform"]').getForm();
        var record = this.getRolePermission().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        if (record) {
            ItemSelectorForm.submit({
                url: projectGP('/permission/insertPermRole'),
                method: 'POST',
                params: {id: record.get('id')},
                success: function (form, action) {
                    Jm.Msg.success("保存成功！");
                },
                failure: function (form, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            })
        } else {
            Jm.MessageBox.info('未选择角色！');
        }
    }
});
