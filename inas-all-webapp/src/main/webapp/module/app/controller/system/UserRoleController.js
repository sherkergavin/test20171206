Ext.define('inas.controller.system.UserRoleController',{
    extend:'Ext.app.Controller',
    models:['system.SelectorModel'],
    stores:['system.UserRoleStore','system.RoleCheckedStore','system.UnAssignedUserStore','system.RoleUserStore','system.UserCheckedStore','system.UnAssignedRoleByUserStore'],
    views:['system.UserRole'],
    refs:[{
        ref:'userRole',
        selector:'userRole'
    }],
    init:function(){
        this.control({
            'userRole':{
        //        beforerender:this.doClear
            },
            'userRole>toolbar>button[action="move-prev"]':{
                click:this.doPrev
            },
            'userRole>toolbar>button[action="move-next"]':{
                click:this.doNext
            },
            'userRole>panel>treepanel[name="role"]':{
                itemclick:this.doLoadRoleUser
            },
            'userRole>panel>toolbar>button[action="addRole"]':{
                click:this.doAdd
            },
            'userRole>panel>toolbar>button[action="editRole"]':{
                click:this.doEdit
            },
            'userRole>panel>toolbar>button[action="deleteRole"]':{
                click:this.doDelete
            },
            'userRole>panel>toolbar>button[action="clear"]':{
                click:this.doRoleClear
            },
            'userRole>panel[name="assignUser"]>toolbar>button[action="reset"]':{
                click:this.doUserReset
            },
            'userRole>panel[name="assignUser"]>toolbar>button[action="save"]':{
                click:this.doUserSave
            },
            'userRole>panel>treepanel[name="user"]':{
                itemclick:this.doLoadUserRole
            },
            'userRole>panel[name="assignRole"]>toolbar>button[action="reset"]':{
                click:this.doRoleReset
            },
            'userRole>panel[name="assignRole"]>toolbar>button[action="save"]':{
                click:this.doRoleSave
            }
        });
    },

    doPrev:function(){
        var record = this.getUserRole().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        if(record){
            var userRole=this.getUserRole().down('itemselector[name="roleitemselector"]');
            this.getUserRole().down('itemselector[name="roleitemselector"]').getStore().load({
                callback:function(){
                    var array  = new Array();
                    var UnAssignedUserStore = Ext.create('inas.store.system.UnAssignedUserStore');
                    UnAssignedUserStore.load({
                        params:{id:record.get('id')},
                        callback: function(records, options, success){
                            Ext.each(records,function(item){
                                array.push(item.data.value);
                            });
                            userRole.setValue(array);
                        }
                    })
                }
            })
        };
        var role = this.getUserRole();
        role.layout.setActiveItem(0);
        this.getUserRole().down('jbutton[action="move-prev"]').setDisabled(!role.getLayout().getPrev());
        this.getUserRole().down('jbutton[action="move-next"]').setDisabled(!role.getLayout().getNext());
    },
    doNext:function(){
        var record = this.getUserRole().down('treepanel[name="user"]').getSelectionModel().getSelection()[0];
        if(record){
            var userRole=this.getUserRole().down('itemselector[name="useritemselector"]');
            this.getUserRole().down('itemselector[name="useritemselector"]').getStore().load({
                callback:function(){
                    var array  = new Array();
                    var UnAssignedRoleByUserStore = Ext.create('inas.store.system.UnAssignedRoleByUserStore');
                    UnAssignedRoleByUserStore.load({
                        params:{id:record.get('id')},
                        callback: function(records, options, success){
                            Ext.each(records,function(item){
                                array.push(item.data.value);
                            });
                            userRole.setValue(array);
                        }
                    })
                }
            })
        };
        var role = this.getUserRole();
        role.layout.setActiveItem(1);
        this.getUserRole().down('jbutton[action="move-prev"]').setDisabled(!role.getLayout().getPrev());
        this.getUserRole().down('jbutton[action="move-next"]').setDisabled(!role.getLayout().getNext());

        var record = this.getUserRole().down('treepanel[name="user"]').getSelectionModel().getSelection()[0];
        if(record){
            var userRole=this.getUserRole().down('itemselector[name="useritemselector"]');
            this.getUserRole().down('itemselector[name="useritemselector"]').getStore().load({
                callback:function(){
                    var array  = new Array();
                    var UnAssignedRoleByUserStore = Ext.create('inas.store.system.UnAssignedRoleByUserStore');
                    UnAssignedRoleByUserStore.load({
                        params:{id:record.get('id')},
                        callback: function(records, options, success){
                            Ext.each(records,function(item){
                                array.push(item.data.value);
                            });
                            userRole.setValue(array);
                        }
                    })
                }
            })
        }
    },

    doLoadRoleTree:function(){
        this.getUserRole().down('treepanel[name="role"]').getStore().load();
    },
    doLoadRoleUser:function(tree, record, item, index, e, eOpts){
        if(record.parentNode.isRoot()){
            /*var userRole=this.getUserRole().down('itemselector');

            var array  = new Array();
            var UnAssignedUserStore = Ext.create('inas.store.user.UnAssignedUserStore');
            UnAssignedUserStore.load({
                params:{id:record.get('id')},
                callback: function(records, options, success){
                    Ext.each(records,function(item){
                        array.push(item.data.value);
                    });
                    userRole.setValue(array);
                }
            });*/
            var userRole=this.getUserRole().down('itemselector[name="roleitemselector"]');
            this.getUserRole().down('itemselector[name="roleitemselector"]').getStore().load({
                callback:function(){
                    var array  = new Array();
                    var UnAssignedUserStore = Ext.create('inas.store.system.UnAssignedUserStore');
                    UnAssignedUserStore.load({
                        params:{id:record.get('id')},
                        callback: function(records, options, success){
                            Ext.each(records,function(item){
                                array.push(item.data.value);
                            });
                            userRole.setValue(array);
                        }
                    })
                }
            })
        }
    },
    doLoadUserRole:function(tree, record, item, index, e, eOpts){
        if(record.parentNode.isRoot()){
            var userRole=this.getUserRole().down('itemselector[name="useritemselector"]');
            this.getUserRole().down('itemselector[name="useritemselector"]').getStore().load({
                callback:function(){
                    var array  = new Array();
                    var UnAssignedRoleByUserStore = Ext.create('inas.store.system.UnAssignedRoleByUserStore');
                    UnAssignedRoleByUserStore.load({
                        params:{id:record.get('id')},
                        callback: function(records, options, success){
                            Ext.each(records,function(item){
                                array.push(item.data.value);
                            });
                            userRole.setValue(array);
                        }
                    });
                }
            })
        }
    },
    doAdd:function(){
        var userRoleWin = Ext.create("inas.view.system.UserRoleWin");
        userRoleWin.title = '新增角色';
        userRoleWin.down('form').getForm().url = projectGP('/role/insertRole');
        userRoleWin.show();
    },
    doEdit:function(){
        var record = this.getUserRole().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        if(record){
            record =  this.getUserRole().down('treepanel[name="role"]').getStore().getNodeById(record.get('id')).raw;
            var userRoleWin = Ext.create("inas.view.system.UserRoleWin");
            userRoleWin.down('form').getForm().findField('id').setValue(record.id);
            userRoleWin.down('form').getForm().findField('name').setValue(record.text);
            userRoleWin.down('form').getForm().findField('description').setValue(record.description);
            userRoleWin.down('form').getForm().findField('lo').setValue(record.lo);
            userRoleWin.down('form').getForm().url = projectGP('/role/updateRole');
            userRoleWin.title = '编辑角色';
            userRoleWin.show();
        }else{
            Jm.MessageBox.info('未选择角色！');
        }
    },
    doDelete:function(){
        var record = this.getUserRole().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        var userRoleTree = this.getUserRole().down('treepanel[name="role"]');
        var userRole = this.getUserRole().down('itemselector[name="roleitemselector"]');
        //record.parentNode.isRoot()
        if(record){
            Ext.MessageBox.confirm('删除角色', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/role/deleteRole'),
                        method : 'post',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if(res.success){
                                userRoleTree.getStore().reload({
                                    callback: function(records, options, success){
                                        if(records.length > 0){
                                            userRoleTree.getSelectionModel().selectRange(0,0);//默认选中第一条数据
                                            var newrecord = userRoleTree.getSelectionModel().getSelection()[0];//重载第一条数据
                                            userRole.getStore().load({
                                                callback:function(){
                                                    var array  = new Array();
                                                    var UnAssignedUserStore = Ext.create('inas.store.system.UnAssignedUserStore');
                                                    UnAssignedUserStore.load({
                                                        params:{id:newrecord.get('id')},
                                                        callback: function(records, options, success){
                                                            Ext.each(records,function(item){
                                                                array.push(item.data.value);
                                                            });
                                                            userRole.setValue(array);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                });
                            }else{
                                Jm.MessageBox.error(res.handle);
                            }
                        }
                    });
                }
            })
        }else{
            Jm.MessageBox.info('未选择角色！');
        }
    },
    doUserReset:function(){
        var record = this.getUserRole().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        if(record){
            var userRole=this.getUserRole().down('itemselector[name="roleitemselector"]');
            this.getUserRole().down('itemselector[name="roleitemselector"]').getStore().load({
                callback:function(){
                    var array  = new Array();
                    var UnAssignedUserStore = Ext.create('inas.store.system.UnAssignedUserStore');
                    UnAssignedUserStore.load({
                        params:{id:record.get('id')},
                        callback: function(records, options, success){
                            Ext.each(records,function(item){
                                array.push(item.data.value);
                            });
                            userRole.setValue(array);
                        }
                    })
                }
            })
        }
    },
    doUserSave:function(){
        var ItemSelectorForm = this.getUserRole().down('form[name="roleform"]').getForm();
        var record = this.getUserRole().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        if(record){
            ItemSelectorForm.submit({
                url : projectGP('/role/insertUserRole'),
                method : 'POST',
                params :{id:record.get('id')},
                success: function (form, action) {
                    Jm.Msg.success('操作成功');
               //     this.doRoleReset
                },
                failure: function (form, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            })
        }else{
            Jm.MessageBox.info('未选择角色！');
        }
    },
    doRoleReset:function(){
        var record = this.getUserRole().down('treepanel[name="user"]').getSelectionModel().getSelection()[0];
        if(record){
            var userRole=this.getUserRole().down('itemselector[name="useritemselector"]');
            this.getUserRole().down('itemselector[name="useritemselector"]').getStore().load({
                callback:function(){
                    var array  = new Array();
                    var UnAssignedRoleByUserStore = Ext.create('inas.store.system.UnAssignedRoleByUserStore');
                    UnAssignedRoleByUserStore.load({
                        params:{id:record.get('id')},
                        callback: function(records, options, success){
                            Ext.each(records,function(item){
                                array.push(item.data.value);
                            });
                            userRole.setValue(array);
                        }
                    })
                }
            })
        }
    },
    doRoleSave:function(){
        var ItemSelectorForm = this.getUserRole().down('form[name="userform"]').getForm();
        var record = this.getUserRole().down('treepanel[name="user"]').getSelectionModel().getSelection()[0];
        if(record){
            //     alert(this.getUserRole().down('form').getForm().getValues().itemselector);
            ItemSelectorForm.submit({
                url : projectGP('/role/insertRoleUser'),
                method : 'POST',
                params :{id:record.get('id')},
                success: function (form, action) {
                    Jm.Msg.success('操作成功');
                    //     this.doRoleReset
                },
                failure: function (form, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            })
        }else{
            Jm.MessageBox.info('未选择用户！');
        }
    }
});
