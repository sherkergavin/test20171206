
Ext.define('inas.store.data.DataFormatStore', {
    extend:'Ext.data.Store',
    model:'inas.model.data.DataFormatModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/format/getDataFormatByEntity'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
})