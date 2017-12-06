/**
 * Created by DongYibo on 2015/6/3.
 */
/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.controller.data.DataBindChildWindowController',{
    extend:'Ext.app.Controller',
    //stores:['data.StationCategoryStore'],
    refs:[
        {
            ref:'dataChildBindWin',
            selector:'dataChildBindWin'
        },
        {
            ref:'bind',
            selector:'bind'
        }],
    init:function(){
        this.control({
            'dataChildBindWin button[action="add"]': {
                click: this.saveConfig,
                beforeitemclick :this.combx
            },
            'dataChildBindWin button[action="reset"]':{
                click:this.doDataReset
            }
        });
    },
    combx:function(view,record, item, index, e, eOpts){
        var com = this.getCollect().down('form[name="db_external"]').down('combo[name="type"]').setValue(1);
        com.getStore().load();
    },
    saveConfig: function () {
        var window=this.getDataChildBindWin();
        var tree=this.getBind().down('treepanel[name="d_bindTree"]');
        var combo = this.getBind().down('form[name="d_bind"]').down('treepicker[name="parent_id"]');

        var form = window.down('form').getForm();
        window.down('form').down('hiddenfield[name="parent_id"]').setValue(window.getParent_id());
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
         this.getDataChildBindWin().down('form').getForm().findField('name').setValue(null);
        this.getDataChildBindWin().down('form').getForm().findField('type').setValue(null);
    }
});