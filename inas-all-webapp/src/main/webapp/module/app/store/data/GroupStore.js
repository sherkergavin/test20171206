Ext.define('inas.store.data.GroupStore', {
    extend:'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: projectGP('/sgroup/allGroup'),
        reader: {
            type: 'json'
            }
        },
    autoLoad: false,
    root: {
        expanded: false
    }
});

