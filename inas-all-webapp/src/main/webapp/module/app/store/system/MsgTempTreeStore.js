/*
 *权限树
 */
Ext.define('inas.store.system.MsgTempTreeStore',{
    extend:'Ext.data.TreeStore',
    model:'inas.model.system.MsgTempTreeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/msgTemplate/queryMsgTemplateTree'),
        reader:{
            type:'json'
        }
    }
});