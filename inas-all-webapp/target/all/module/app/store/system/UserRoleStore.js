/*
 *角色树
 */
Ext.define('inas.store.system.UserRoleStore',{
    extend:'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/role/getRoleTree'),
        reader:{
            type:'json'
       //     root:'data'
        }
    }
});