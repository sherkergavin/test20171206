Ext.define('inas.store.pm.AllAreaStore', {
    extend:'Ext.data.Store',
    fields: ['id', 'name'],
    proxy: {
        type: 'ajax',
        url: projectGP('/area/getParentArea'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
    ,
    autoLoad: false,
    root: {
        expanded: false
    }
})