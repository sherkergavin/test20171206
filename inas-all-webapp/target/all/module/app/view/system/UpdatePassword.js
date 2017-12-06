/**
 * Created by WangJm on 2015/10/14.
 */
Ext.define('inas.view.system.UpdatePassword', {
    extend: 'Ext.Window',
    alias: 'widget.updatePassword',
    requires: [
        'Jm.button.Button',
        'Ext.form.*',
        'Ext.tip.QuickTipManager'
    ],
    initComponent: function () {
        var me = this;

        var oldPassword = Ext.create('Ext.form.field.Text', {
            fieldLabel: '原始密码',
            name: 'oldPassword',
            allowBlank: false
        });

        var newPassword = Ext.create('Ext.form.field.Text', {
            fieldLabel: '新密码',
            name: 'newPassword',
            maxLength: 16,
            minLength: 3,
            allowBlank: false
        });

        var newPasswords = Ext.create('Ext.form.field.Text', {
            fieldLabel: '重复新密码',
            name: 'newPasswords',
            maxLength: 16,
            minLength: 3,
            allowBlank: false
        });

        var form = Ext.create('Ext.form.Panel', {
            layout: 'anchor',
            anchor: '100% 100%',
            name: 'updateForm',
            buttonAlign: 'center',
            bodyPadding: 5,
            defaults: {
                anchor: '95%',
                margin: '5 0 0 5'
            },
            items: [oldPassword, newPassword, newPasswords]
        });

        Ext.apply(this, {
            title :'修改当前用户密码',
            width: 400,
            height: 200,
            layout: 'anchor',
            buttonAlign: 'center',
            modal: true,
            items: [form],
            buttons: [{
                xtype: 'jbutton',
                action: 'submit',
                handler: function(){
                    var newPassword1 = newPassword.getValue();
                    var newPasswords1 = newPasswords.getValue();

                    if (form.getForm().isValid()) {
                        if (newPassword1 != newPasswords1) {
                            return Jm.MessageBox.error("新密码两次确认错误，请更正！");
                        }else{
                            form.getForm().submit({
                                method: 'POST',
                                url: projectGP('/module/updateUserPassword'),
                                success: function (forms, action) {
                                    Jm.Msg.info('修改成功！系统将自动登出，请输入新密码登录！',function(btn){
                                        if(btn == 'ok'){
                                            window.location.href=projectGP('/module-jsp/app/logout.jsp');
                                        }
                                    });
                                }, failure: function (forms, action) {
                                    Jm.MessageBox.error(action.result.handle);
                                }
                            });
                        }
                    }
                }
            }, {
                xtype: 'jbutton',
                action: 'close',
                handler:function(){
                    me.close();
                }
            }]
        });
        this.callParent(arguments);
    }
});