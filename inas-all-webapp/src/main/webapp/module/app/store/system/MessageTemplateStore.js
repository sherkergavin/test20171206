/*
 *权限树
 */
Ext.define('inas.store.system.MessageTemplateStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.MessageTemplateModel',

    proxy: {
        type: 'ajax',
        url:projectGP('/msgTemplate/queryTemplateByEn'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});