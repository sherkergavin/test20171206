Ext.define('inas.store.pm.AllExternalStore', {
    extend: 'Ext.data.Store',
    model: 'inas.model.pm.CollectTaskModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: projectGP('/external/allExternal'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});