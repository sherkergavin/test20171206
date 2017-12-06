Ext.define('inas.store.pm.DataBindColumnStore',{
    extend:'Ext.data.Store',
    model: 'inas.model.pm.DataBindColumnModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/data/dataBindColumnList'),
        reader: {
            type: 'json',
            root: 'data'
        }
    }
})