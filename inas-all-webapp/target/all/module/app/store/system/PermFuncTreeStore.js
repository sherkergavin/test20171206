/*
 *权限树
 */
Ext.define('inas.store.system.PermFuncTreeStore',{
    extend:'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/permission/getFuncPermTree'),
        reader:{
            type:'json'
        }
    }
});