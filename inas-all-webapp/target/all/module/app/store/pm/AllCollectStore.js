Ext.define('inas.store.pm.AllCollectStore',{
    extend:'Ext.data.Store',
    model:'inas.model.pm.CollectTaskModel',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/data/collect.json'),
        reader:{
            type:'json',
            root:'data'
        }
    }
});