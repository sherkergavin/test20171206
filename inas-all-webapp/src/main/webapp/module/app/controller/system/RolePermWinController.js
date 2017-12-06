Ext.define('inas.controller.system.RolePermWinController', {
    extend: 'Ext.app.Controller',
    stores: [ 'system.DictionaryStore' ],
    models: [ 'system.DictionaryModel'],
    refs: [{
        ref: 'rolePermWin',
        selector: 'rolePermWin'
    },{
        ref: 'rolePermission',
        selector: 'rolePermission'
    }],
    init: function () {
        this.control({
            'rolePermWin': {
                render:this.doLoad,
                close: this.closeWindow
            },
            'rolePermWin button[action="save"]': {
                click: this.savePerm
            },
            'rolePermWin button[action="reset"]': {
                click: this.resetPerm
            }
        })
    },


    initDepartment: function (c,e) {
        c.store.load();
    },
    doLoad:function(){
        this.getRolePermWin().down('combo[name="permission_type"]').getStore().load({
            params:{type:Jm.DB.Constant.DICTIONARY_TYPE_EXECUTEPERMISSIONS}
        });
    },
    closeWindow: function () {
        var record = this.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().getSelection()[0];
        this.getRolePermission().down('treepanel[name="permission"]').getStore().load();
        this.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().select(record);
    },

    resetPerm: function () {
        var role_id = this.getRolePermWin().down('form').getForm().findField('id').getValue();
        if(role_id == ''){
            this.getRolePermWin().down('form').getForm().reset();
        }else{
            var record = this.getRolePermission().down('treepanel[name="permission"]').getSelectionModel().getSelection()[0];
            if(record){
                record =  this.getRolePermission().down('treepanel[name="permission"]').getStore().getNodeById(record.get('id')).raw;
                this.getRolePermWin().down('form').getForm().findField('id').setValue(record.id);
                this.getRolePermWin().down('form').getForm().findField('resource_type').setValue(record.text);
                this.getRolePermWin().down('form').getForm().findField('permission_type').setValue(parseInt(record.description));
                this.getRolePermWin().down('form').getForm().findField('lo').setValue(record.lo);
            }
        }

    } ,
    savePerm: function () {
        var window=this.getRolePermWin();
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