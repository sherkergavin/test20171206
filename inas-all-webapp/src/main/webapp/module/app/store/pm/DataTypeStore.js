Ext.define('inas.store.pm.DataTypeStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields:['id','name'],
    proxy: {
        type: 'ajax',
        //url: projectGP('/data/dataTypeTree.json'),
        //url:projectGP('/system/getDictionaryByType'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});