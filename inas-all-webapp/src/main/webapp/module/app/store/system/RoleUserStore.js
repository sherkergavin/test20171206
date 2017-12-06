/*
 *角色树
 */
Ext.define('inas.store.system.RoleUserStore',{
    extend:'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/role/getUserTree'),
        reader:{
            type:'json'
            //     root:'data'
        }
    }
});