Ext.define('inas.controller.system.UserRoleWinController', {
    extend: 'Ext.app.Controller',
    //   stores: [ 'user.DepartmentStore' ],
    //  models: [ 'user.DepartmentModel'],
    refs: [{
        ref: 'userRoleWin',
        selector: 'userRoleWin'
    },{
        ref: 'userRole',
        selector: 'userRole'
    }],
    init: function () {
        this.control({
            'userRoleWin': {
                close: this.closeWindow
            },
            'userRoleWin button[action="save"]': {
                click: this.saveRole
            },
            'userRoleWin button[action="reset"]': {
                click: this.resetRole
            }
        })
    },


    initDepartment: function (c,e) {
        c.store.load();
    },
    closeWindow: function () {
        var record = this.getUserRole().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
        this.getUserRole().down('treepanel[name="role"]').getStore().load();
        this.getUserRole().down('treepanel[name="role"]').getSelectionModel().select(record);
    },

    resetRole: function () {
        var role_id = this.getUserRoleWin().down('form').getForm().findField('id').getValue();
        if(role_id == ''){
            this.getUserRoleWin().down('form').getForm().reset();
        }else{
            var record = this.getUserRole().down('treepanel[name="role"]').getSelectionModel().getSelection()[0];
            if(record){
                record =  this.getUserRole().down('treepanel[name="role"]').getStore().getNodeById(record.get('id')).raw;
                this.getUserRoleWin().down('form').getForm().findField('id').setValue(record.id);
                this.getUserRoleWin().down('form').getForm().findField('name').setValue(record.text);
                this.getUserRoleWin().down('form').getForm().findField('description').setValue(record.description);
                this.getUserRoleWin().down('form').getForm().findField('lo').setValue(record.lo);
            }
        }

    } ,
    saveRole: function () {
        var window=this.getUserRoleWin();
        var form = window.down('form').getForm();
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    window.close();
                },
                failure: function (form, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            })
        }
    }

});