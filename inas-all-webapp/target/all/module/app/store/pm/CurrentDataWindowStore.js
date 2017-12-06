Ext.define('inas.store.pm.CurrentDataWindowStore',{
    extend:'Ext.data.Store',
    model: 'inas.model.pm.CurrentDataWindowModel',
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url: projectGP('/data/getCurrentDataByStation'),
        reader: {
            type: 'json',
            root: 'data'
        }
    }
})