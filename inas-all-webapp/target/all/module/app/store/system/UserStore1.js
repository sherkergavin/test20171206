Ext.define('inas.store.system.UserStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.UserModel',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/module/getSystemUserList'),
        reader:{
            type:'json',
            root:'data'
        },
        autoLoad : false
    }
});