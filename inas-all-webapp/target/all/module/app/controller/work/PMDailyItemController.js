/**
 * Created by WangJm on 2015/8/4.
 */
Ext.define('inas.controller.work.undetermined.PMDailyItemController', {
    extend: 'Ext.app.Controller',
    models: ['work.DailyItemModel'],
    stores: ['work.DailyItemStore'],
    views: ['work.DailyItemView'],
    refs: [{
        ref: 'dailyItemView',
        selector: 'dailyItemView'
    },{
        ref: 'dailyItemGrid',
        selector: 'dailyItemView>grid'
    }],
    init:function(){
        this.control({
            'dailyItemView>toolbar>button[action="add"]':{
                click : this.doAdd
            },
            'dailyItemView>toolbar>button[action=""]':{

            }
        })
    },
    doAdd : function(){
        var me = this;
        var grid = me.getDailyItemGrid();
        var store = grid.getStore();
        var cellEditing = grid.getPlugin('cellplugin');
        store.insert(store.getCount(), me.getModel('work.DailyItemModel'));
        cellEditing.startEdit(store.getCount() - 1, 0);
    }
});