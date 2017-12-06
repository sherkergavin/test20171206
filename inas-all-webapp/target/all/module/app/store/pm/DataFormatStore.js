
Ext.define('inas.store.pm.DataFormatStore', {
    extend:'Ext.data.Store',
    model:'inas.model.pm.DataFormatModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/format/getDataFormatById'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
})