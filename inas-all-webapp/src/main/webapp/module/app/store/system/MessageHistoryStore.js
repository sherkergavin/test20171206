/*
 *权限树
 */
Ext.define('inas.store.system.MessageHistoryStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.MessageHistoryModel',

    proxy: {
        type: 'ajax',
        url:projectGP('/msgHistory/queryMsgHistoryList'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});