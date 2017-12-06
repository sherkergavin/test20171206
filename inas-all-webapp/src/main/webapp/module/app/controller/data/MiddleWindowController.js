/**
 * Created by JM-SD09 on 2016/4/5.
 */
Ext.define('inas.controller.data.MiddleWindowController', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'MiddleWindow',
        selector: 'MiddleWindow'
    }, {
        ref: 'middleForm',
        selector: 'MiddleWindow>form[name=middleForm1]'
    }, {
        ref: 'middleGrid',
        selector: 'middlePanel>grid[name=middleGrid]'
    }],
    init: function () {
        this.control({
            'MiddleWindow button[action="save"]':{
                click: this.doSave
            },
            'MiddleWindow button[action="close"]':{
                click: this.doClose
            },
            'MiddleWindow form combobox[name="entity_type_id"]':{
                render: this.onRender,
                select: this.queryEntity
            },
            'MiddleWindow form combobox[name="entity_name"]':{
                select: this.queryItem
            },
            'MiddleWindow':{
                render:this.windowRender
            },
            'MiddleWindow form combobox[name="data_item_name"]':{
                select: this.changeOrder
            }
        })
    },

    windowRender:function(){
        var win = this.getMiddleWindow();
        win.down('combobox[name=entity_name]').disable();
        win.down('combobox[name=data_item_name]').disable();
    },

    onRender: function (t) {
        t.getStore().load();
    },

    changeOrder:function(){
        var win = this.getMiddleWindow();
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
        var win = this.getMiddleWindow();
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
        var win = this.getMiddleWindow();
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
        var win=me.getMiddleWindow();
        var form=me.getMiddleForm();
        var grid=this.getMiddleGrid();
        var middleForm1=me.getMiddleForm().getForm();
        if (middleForm1.isValid()) {
            //alert("in save url");
            middleForm1.submit({
                method: "POST",
                url: projectGP('/data/saveMiddleAndSwitch'),
                success: function (forms, action) {
                    grid.getStore().reload();
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
        var win=me.getMiddleWindow();
        win.close();

    }


});