/**
 * Created by JM-SD09 on 2016/5/13.
 */

Ext.define('inas.controller.work.SwitchMiddleWindowController', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'SwitchMiddleWindow',
        selector: 'SwitchMiddleWindow'
    }, {
        ref: 'middleForm',
        selector: 'SwitchMiddleWindow>form[name=middleForm1]'
    }, {
        ref: 'switchWindow',
        selector: 'switchWindow'
    }
    //    , {
    //    ref: 'switchWinGrid',
    //    selector: 'SwitchWindow>grid[name=switchMiddleGrid]'
    //}
    ],
    init: function () {
        this.control({
            'SwitchMiddleWindow button[action="save"]':{
                click: this.doSave
            },
            'SwitchMiddleWindow button[action="close"]':{
                click: this.doClose
            },
            'SwitchMiddleWindow form combobox[name="entity_type_id"]':{
                render: this.onRender,
                select: this.queryEntity
            },
            'SwitchMiddleWindow form combobox[name="entity_name"]':{
                select: this.queryItem
            },
            'SwitchMiddleWindow':{
                render:this.windowRender
            },
            'SwitchMiddleWindow form combobox[name="data_item_name"]':{
                select: this.changeOrder
            }
        })
    },

    windowRender:function(){
        var win = this.getSwitchMiddleWindow();
        win.down('combobox[name=entity_type_id]').disable();
        win.down('combobox[name=entity_name]').disable();
        win.down('combobox[name=data_item_name]').disable();
    },

    onRender: function (t) {
        t.getStore().load();
    },

    changeOrder:function(){
        var win = this.getSwitchMiddleWindow();
        var store = win.down('combobox[name=data_item_name]').getStore();
        var data_item_id = win.down('combobox[name=data_item_name]').getValue();
        var entity_type_id = win.down('combobox[name="entity_type_id"]').getValue();
        //if (entity_type_id == 2){
        //    win.down('textfield[name="pressure2_before"]').disable();
        //    win.down('textfield[name="pressure3_before"]').disable();
        //    win.down('textfield[name="pressure2_after"]').disable();
        //    win.down('textfield[name="pressure3_after"]').disable();
        //} else {
        //    win.down('textfield[name="pressure2_before"]').enable();
        //    win.down('textfield[name="pressure3_before"]').enable();
        //    win.down('textfield[name="pressure2_after"]').enable();
        //    win.down('textfield[name="pressure3_after"]').enable();
        //}
        for(var i=0;i<store.getCount();i++) {
            if (store.getAt(i).get('ID') == data_item_id){
                if(store.getAt(i).get('DATA_FORMAT_ID')==108){
                    win.down('radio[id=op_order1]').setBoxLabel('进水');
                    win.down('radio[id=op_order2]').setBoxLabel('关水');
                    win.down('radio[id=op_order3]').hide();
                }else{
                    win.down('radio[id=op_order1]').setBoxLabel('开');
                    win.down('radio[id=op_order2]').setBoxLabel('关');
                    win.down('radio[id=op_order3]').setVisible(true);
                }

            }
        }
    },

    queryEntity:function(combo,records){
        var win = this.getSwitchMiddleWindow();
        var entity_type_id = win.down('combobox[name=entity_type_id]').getValue();
        var entity_id = win.down('combobox[name=entity_name]');
        entity_id.getStore().getProxy().url = projectGP('/data/getEntityByType');
        entity_id.getStore().load({
            params: {
                entity_type_id: entity_type_id
            }
        });
    },

    queryItem:function(combo,records){
        var win = this.getSwitchMiddleWindow();
        var entity_id = win.down('combobox[name=entity_name]').getValue();
        var item = win.down('combobox[name=data_item_name]');
        item.getStore().getProxy().url = projectGP('/data/getItemIdName');
        item.getStore().load({
            params: {
                entity_id: entity_id
            }
        });
    },

    doSave:function(btn){
        //alert("in save");
        var me=this;
        var win=me.getSwitchMiddleWindow();
        var switchwin = me.getSwitchWindow();
        var grid = switchwin.down('grid[name=switchWinGrid]');
        var middleForm1=me.getMiddleForm().getForm();
        if (middleForm1.isValid()) {
            //alert("in save url");
            middleForm1.submit({
                method: "POST",
                url: projectGP('/data/saveMiddleAndSwitch'),
                success: function (forms, action) {
                    //grid.getStore().reload();
                    win.close();
                }, failure: function (f, a) {
                    Jm.MessageBox.error(a.result.handle);
                    win.close();
                }
            });
        }
    },

    doClose:function(btn){
        var me = this;
        var win=me.getSwitchMiddleWindow();
        win.close();
    }


});