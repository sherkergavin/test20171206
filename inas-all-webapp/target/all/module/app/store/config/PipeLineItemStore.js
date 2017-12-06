/**
 * Created by WangJm on 2015/10/9.
 */
Ext.define('inas.store.config.PipeLineItemStore', {
    extend:'Ext.data.Store',
    model:'inas.model.config.PipeLineGridModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/config/getPipeLineItem'),
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