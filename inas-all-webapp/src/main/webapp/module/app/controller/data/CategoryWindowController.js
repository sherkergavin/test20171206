/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.controller.data.CategoryWindowController',{
    extend:'Ext.app.Controller',
    //models:['data.StationCategoryModel'],
    stores:['data.StationCategoryStore','system.DictionaryStore'],
    refs:[
        {
            ref:'CategoryWindow',
            selector:'CategoryWindow'
        },
        {
            ref:'StationType',
            selector:'StationType'
        }],
    init:function(){
        this.control({
            'CategoryWindow':{
                render:this.doLoad,
                close: this.closeWindow
            },
            'CategoryWindow button[action="save"]': {
                click: this.saveConfig
            },
            'CategoryWindow button[action="reset"]': {
                click: this.resetConfig
            }
        });
    },
    doLoad:function(){
        this.getCategoryWindow().down('combo[name="category"]').store.load({
            params: {
                type: Jm.DB.Constant.DICTIONARY_TYPE_STATIONTYPE
            },
            callback: function (records, operation, success) {
            }


        });

    },
    closeWindow: function () {

        this.getStationType().store.load();

    },
    saveConfig:function(btn){
        var window=this.getCategoryWindow();
        var form=btn.up('form').getForm();
        var grid=this.getStationType();
        if (form.isValid()) {
            form.submit({
                url: projectGP('/data/saveEntityType'),
                method: "POST",
                params: {
                    //newStatus: 'delivered'
                },
                success: function (form, action) {
                    window.close();
                    //grid.store.load();

                },
                failure: function (form, action) {
                    Jm.Msg.error('加载错误！请联系管理员！');
                }

            });
        }

    },
    resetConfig:function(btn){
        var id=btn.up('form').getForm().findField('id').getValue();
        btn.up('form').getForm().reset();
        if(id!=null){
            btn.up('form').getForm().findField('id').setValue(id);
        }



    }
});