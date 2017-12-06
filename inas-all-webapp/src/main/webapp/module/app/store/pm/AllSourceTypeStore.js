Ext.define('inas.store.pm.AllSourceTypeStore',{
    extend:'Ext.data.Store',
    model:'inas.model.pm.SourceTypeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/dbType/allSourceType'),
        reader:{
            type:'json',
            root:'data'
        }
    }
});