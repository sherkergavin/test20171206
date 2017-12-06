Ext.define('inas.store.pm.DataTypeItemAllStore',{
    extend:'Ext.data.Store',
    model: 'inas.model.pm.DataTypeItemAllModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/data/findDataTypeItemAll'),
        reader: {
            type: 'json',
            root: 'data'
        }
    }
})