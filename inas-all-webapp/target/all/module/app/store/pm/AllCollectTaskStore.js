Ext.define('inas.store.pm.AllCollectTaskStore',{
    extend:'Ext.data.Store',
    //model:'inas.model.data.SourceTypeModel',
    fields: ['id', 'text'],
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/collect/allcollect'),
        reader:{
            type:'json',
            root: 'data'
        }
    }
});