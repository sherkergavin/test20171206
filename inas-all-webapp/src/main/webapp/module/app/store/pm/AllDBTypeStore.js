
Ext.define('inas.store.pm.AllDBTypeStore', {
    extend: 'Ext.data.Store',
    model: 'inas.model.pm.DBTypeModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: projectGP('/dbType/allSource'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});