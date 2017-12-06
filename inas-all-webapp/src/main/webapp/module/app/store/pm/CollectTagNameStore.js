Ext.define('inas.store.pm.CollectTagNameStore',{
    extend:'Ext.data.Store',
    fields: ['gather_key'],
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/collect/searchItems'),
        reader:{
            type:'json',
            root:'data'
        }
    }
});