/**
 * Created by WangJm on 2015/8/5.
 */
Ext.define('inas.store.work.DailyItemStore', {
    extend:'Ext.data.Store',
    model:'inas.model.work.DailyItemModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/work/getDailyItem'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: false
});