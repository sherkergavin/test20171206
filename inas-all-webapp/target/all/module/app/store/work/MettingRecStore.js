Ext.define('inas.store.work.MettingRecStore', {
    extend: 'Ext.data.Store',
    model: 'inas.model.work.MettingRecModel',
    pageSize: Jm.Constant.PAGESZIE,
    proxy: {
        type: 'ajax',
        url: projectGP('/mettingRec/getMettingRecByMap'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalProperty'
        }
    },
    autoLoad: false
});