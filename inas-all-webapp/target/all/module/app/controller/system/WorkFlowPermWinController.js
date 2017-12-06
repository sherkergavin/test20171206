Ext.define('inas.controller.system.WorkFlowPermWinController', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'workFlowPermWin',
        selector: 'workFlowPermWin'
    },{
        ref: 'rolePermission',
        selector: 'rolePermission'
    }],
    init: function () {
        this.control({
            'workFlowPermWin': {
                //close: this.closeWindow
            },
            'workFlowPermWin button[action="save"]': {
                click: this.savePerm
            },
            'workFlowPermWin button[action="reset"]': {
                click: this.resetPerm
            }
        })
    },
    closeWindow: function () {
        var record = this.getRolePermission().down('treepanel[name="workflow"]').getSelectionModel().getSelection()[0];
        this.getRolePermission().down('treepanel[name="workflow"]').getStore().load();
        this.getRolePermission().down('treepanel[name="workflow"]').getSelectionModel().select(record);
    },

    resetPerm: function () {
        var role_id = this.getWorkFlowPermWin().down('form').getForm().findField('id').getValue();
        if(role_id == ''){
            this.getWorkFlowPermWin().down('form').getForm().reset();
        }else{
            var record = this.getRolePermission().down('treepanel[name="workflow"]').getSelectionModel().getSelection()[0];
            if(record){
                record =  this.getRolePermission().down('treepanel[name="workflow"]').getStore().getNodeById(record.get('id')).raw;
                this.getWorkFlowPermWin().down('form').getForm().findField('id').setValue(record.id);
                this.getWorkFlowPermWin().down('form').getForm().findField('name').setValue(record.text);
                this.getWorkFlowPermWin().down('form').getForm().findField('code').setValue(record.code);
                this.getWorkFlowPermWin().down('form').getForm().findField('lo').setValue(record.lo);
            }
        }

    } ,
    savePerm: function () {
        var me = this;
        var window=this.getWorkFlowPermWin();
        var form = window.down('form').getForm();
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    var record = me.getRolePermission().down('treepanel[name="workflow"]').getSelectionModel().getSelection()[0];
                    me.getRolePermission().down('treepanel[name="workflow"]').getStore().load();
                    me.getRolePermission().down('treepanel[name="workflow"]').getSelectionModel().select(record);
                    window.close();
                },
                failure: function (form, action) {
                    Jm.MessageBox.error(action.result.handle);
                }
            })
        }
    }
});