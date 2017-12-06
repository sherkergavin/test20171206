
Ext.define('inas.store.data.DataAcknowledgedStore', {
    extend:'Ext.data.Store',
    model:'inas.model.data.DataAcknowledgedModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/format/getDataAcknowledgedByEntity'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
})