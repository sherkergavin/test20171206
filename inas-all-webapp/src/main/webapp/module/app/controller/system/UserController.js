Ext.define('inas.controller.system.UserController',{
    extend:'Ext.app.Controller',
    models:['system.UserModel'],
    stores:['system.UserStore'],
    views:['system.User'],
    refs:[{
        ref:'user',
        selector:'user'
    }],
    init:function(){
        this.control({
            'user':{
                show:this.doLoad,
                itemdblclick: this.doEdit
            },
            'user>toolbar>button[action="add"]':{
                click:this.doAdd
            },
            'user>toolbar>button[action="edit"]':{
                click:this.doEdit
            },
            'user>toolbar>button[action="delete"]':{
                click:this.doDelete
            }
        });
    },
    doLoad:function(){
        this.getUser().getStore().load();
    },
    doAdd:function(){
        var userWin = Ext.create("inas.view.system.UserWin");
//        userWindow.down('combo').store.load();
        userWin.title = '新增';
        userWin.down('form').getForm().url = projectGP('/user/insertUser');
        userWin.down('form').getForm().findField('staff_state').setValue('运行');
        userWin.down('form').getForm().findField('staff_gender').setValue('男性');
        userWin.show();
    },
    doEdit:function(){
        var record = this.getUser().getSelectionModel().getSelection()[0];
        if(record){
            record = this.getUser().getStore().getById(record.get('id'));
            var userWin = Ext.create("inas.view.system.UserWin");
            userWin.down('form').getForm().loadRecord(record);
            userWin.down('form').getForm().url = projectGP('/user/updateUser');
            userWin.down('form').getForm().findField('birthday').setValue(record.get('staff_birth'));
            userWin.down('form').getForm().findField('staff_state').setValue(record.get('staff_state'));
            userWin.down('form').getForm().findField('staff_gender').setValue(record.get('staff_gender'));
            userWin.title = '编辑';
            userWin.show();
        }else{
            Jm.MessageBox.info('未选择用户！');
        }
    },
    doDelete:function(){

        var record = this.getUser().getSelectionModel().getSelection()[0];
        var user = this.getUser();
        if(record){
            Ext.MessageBox.confirm('删除用户', '确定删除？', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: projectGP('/user/deleteUser'),
                        method : 'post',
                        params: {
                            id: record.get('id')
                        },
                        success: function (response) {
                            var text = response.responseText;
                            var res = Ext.JSON.decode(text);
                            if(res.success){
                                user.getStore().load();
                            }else{
                                Jm.MessageBox.error(res.handle);
                            }
                        }
                    });
                }
            })
        }else{
            Jm.MessageBox.info('未选择用户！');
        }
    }
});