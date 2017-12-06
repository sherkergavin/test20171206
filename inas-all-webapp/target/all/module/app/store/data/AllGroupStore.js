Ext.define('inas.store.data.AllGroupStore',{
    extend:'Ext.data.Store',
    fields: ['id', 'name'],
    proxy: {
        type: 'ajax',
        url: projectGP('/sgroup/getGroup'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});