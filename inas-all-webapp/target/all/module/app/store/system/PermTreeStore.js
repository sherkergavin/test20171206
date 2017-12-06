/*
 *权限树
 */
Ext.define('inas.store.system.PermTreeStore',{
    extend:'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/permission/getPermTree'),
        reader:{
            type:'json'
            //     root:'data'
        }
    }
});