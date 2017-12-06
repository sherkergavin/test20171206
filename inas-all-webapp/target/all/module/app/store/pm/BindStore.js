Ext.define('inas.store.pm.BindStore', {
    extend:'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: projectGP('/bind/getBindTree'),
        reader: {
            type: 'json'
            }
        },

    autoLoad: false,
    root: {
        expanded: false
    }
});

