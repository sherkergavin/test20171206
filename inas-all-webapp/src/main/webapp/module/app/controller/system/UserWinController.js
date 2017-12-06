Ext.define('inas.controller.system.UserWinController', {
    extend: 'Ext.app.Controller',
    stores: [ 'system.DictionaryStore' ],
    models: [ 'system.DictionaryModel'],
    refs: [{
        ref: 'userWin',
        selector: 'userWin'
    },{
        ref: 'user',
        selector: 'user'
    }],
    init: function () {
        this.control({
            'userWin': {
                render:this.doLoad,
                close: this.closeWindow
            },
            'userWin button[action="save"]': {
                click: this.saveUser
            },
            'userWin button[action="reset"]': {
                click: this.resetUser
            }
        })
    },


    initDepartment: function (c,e) {
        c.store.load();
    },
    doLoad:function(){
        this.getUserWin().down('combo[name="staff_state"]').getStore().load({
            params:{type:Jm.DB.Constant.DICTIONARY_TYPE_ACCOUNTSTATUS}
        });
        this.getUserWin().down('combo[name="staff_gender"]').getStore().load({
            params:{type:Jm.DB.Constant.DICTIONARY_TYPE_GENDER}
        });

        this.getUserWin().down('treepicker[name="organization_id"]').getStore().load();
    },
    closeWindow: function () {
       this.getUser().store.load();
    },

    resetUser: function () {
        var user_id = this.getUserWin().down('form').getForm().findField('id').getValue();
        if(user_id == ''){
            this.getUserWin().down('form').getForm().reset();
            this.getUserWin().down('form').getForm().findField('staff_state').setValue('运行');
            this.getUserWin().down('form').getForm().findField('staff_gender').setValue('男性');
        }else{
            var record = this.getUser().getSelectionModel().getSelection()[0];
            if(record){
                record = this.getUser().getStore().getById(record.get('id'));
                this.getUserWin().down('form').getForm().loadRecord(record);
                this.getUserWin().down('form').getForm().findField('birthday').setValue(record.get('staff_birth'));
                this.getUserWin().down('form').getForm().findField('staff_state').setValue(record.get('staff_state'));
                this.getUserWin().down('form').getForm().findField('staff_gender').setValue(record.get('staff_gender'));
            }
        }
    } ,
    saveUser: function () {
        var window=this.getUserWin();
        var form = window.down('form').getForm();
     //   alert(form.getValues().staff_birth);
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