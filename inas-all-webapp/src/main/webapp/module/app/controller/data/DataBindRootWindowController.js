/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.controller.data.DataBindRootWindowController',{
    extend:'Ext.app.Controller',
    //stores:['data.StationCategoryStore'],
    refs:[
        {
            ref:'dataRootWindow',
            selector:'dataRootWindow'
        },
        {
            ref:'bind',
            selector:'bind'
        }],
    init:function(){
        this.control({
            'dataRootWindow button[action="add"]': {
                click: this.saveConfig
            },
            'dataRootWindow button[action="reset"]':{
                click:this.doDataReset
            }
        });
    },
    saveConfig: function () {
        var window=this.getDataRootWindow();
        var tree=this.getBind().down('treepanel[name="d_bindTree"]');
        var combo = this.getBind().down('form[name="d_bind"]').down('treepicker[name="parent_id"]');
        var form = window.down('form').getForm();
        if (form.isValid()) {
            form.submit({
                success: function (fm, action) {
                    if (action.result.success) {
                        tree.getStore().load();
                        tree.expandAll();
                        combo.getStore().load();
                        fm.reset();
                        window.close();
                    }
                },
                failure: function (form, action) {
                    Jm.MessageBox.error( action.result.handle);
                }
            })
        }
    },
    //重置
    doDataReset:function(){
        this.getDataRootWindow().down('form').getForm().findField('name').setValue(null);
    }
});