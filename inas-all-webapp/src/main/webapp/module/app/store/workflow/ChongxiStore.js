/**
 * Created by luyufei on 2016/4/15.
 */
Ext.define('inas.store.workflow.ChongxiStore', {
    extend:'Ext.data.Store',
    model:'inas.model.workflow.ChongxiModel',
    pageSize: 5,
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url: projectGP('/workflow/getChongxiForm'),
        reader: {
            type: 'json',
            root: 'data.list',
            totalProperty: 'totalProperty'
        }
    },
    autoLoad: false
});