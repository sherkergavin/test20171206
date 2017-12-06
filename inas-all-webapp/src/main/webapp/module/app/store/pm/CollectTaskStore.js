Ext.define('inas.store.pm.CollectTaskStore',{
    extend:'Ext.data.TreeStore',
    model:'inas.model.pm.CollectTaskModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url:projectGP('/collect/getcollect'),
        reader:{
            type:'json'
            //,
            //root: 'children'
            //,
            //successProperty: 'success'
        }
    }
});