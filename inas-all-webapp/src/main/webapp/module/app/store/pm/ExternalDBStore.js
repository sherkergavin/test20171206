Ext.define('inas.store.pm.ExternalDBStore',{
    extend:'Ext.data.TreeStore',
    model:'inas.model.pm.ExternalDBModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url:projectGP('/external/getExternal'),
        reader:{
            type:'json'
            //,
            //successProperty: 'success'
        }
    }
});